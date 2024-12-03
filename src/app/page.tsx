"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [user, setUser] = useState<Todo[]>([]);
  const [inputUser, setInputUser] = useState<string>("");

  async function handleAdd(title: string) {
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    await getUser();
  }

  async function deleteTodo(id: string) {
    await fetch("/api/todo/" + id, {
      method: "DELETE",
    });
    await getUser();
  }

  async function toggleTodo(id: string, completed: boolean) {
    const res = await fetch("/api/todo/" + id, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
    });
    await getUser();
  }

  async function getUser() {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <p className="flex justify-center m-4"> TODOLIST</p>
      <div className="flex justify-center items-center text-black">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Input title"
            onChange={(e) => setInputUser(e.target.value)}
            className="rounded-lg p-2"
          />

          <button
            onClick={() => handleAdd(inputUser)}
            className="border rounded-lg w-24 h-10"
          >
            {" "}
            Add
          </button>
        </div>
      </div>
      <div className="w-[50%] mx-auto">
        {user.map((items) => (
          <div key={items.id} className="flex justify-between ">
            <div className={items.completed ? "line-through" : ""}>
              {" "}
              {items.title}
            </div>
            <div className="space-x-2">
              <input
                type="checkbox"
                defaultChecked={items.completed}
                onChange={(e) =>
                  toggleTodo(items.id.toString(), e.target.checked)
                }
              />
              <button onClick={() => deleteTodo(items.id.toString())}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
