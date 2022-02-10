import { useEffect, useState } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    setLoading(true);
    fetch(`http://localhost:3000/todos?_page=${page}&_limit=3`)
      .then((d) => d.json())
      .then((res) => {
        setTodos(res);
        setLoading(false);
      });
  };

 
  return loading ? (
    "Loading..."
  ) : (
    <div id="container">
      <input
        placeholder="Enter todo"
        onChange={(e) => setText(e.target.value)}
      />
      <button id="add"
        onClick={() => {
          // fetch POST
          const data = { status: false, title: text };
          // axios.post("http://localhost:3001/todos", data)
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
          }).then(getData);
          //   setTodos([...todos, ]);
        }}
      >
        Add todo
      </button>
      {todos.map((e, i) => (
        <div key={e.id}>
          {e.title}<button id="del"
        onClick={() => {
          // fetch POST
          const data = { status: false, title: text };
          // axios.post("http://localhost:3001/todos", data)
          fetch(`http://localhost:3000/todos/${e.id}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
          }).then(getData);
          //   setTodos([...todos, ]);
        }}
      >
        Delete
      </button>
        </div>
      ))}

      <button className="page"
        //   disabled={condition}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>

      <button className="page"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

