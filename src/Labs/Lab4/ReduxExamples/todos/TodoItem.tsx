import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id} className="list-group-item d-flex flex-row-reverse justify-content-end gap-3 align-items-center">
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              className="btn btn-danger"
              id="wd-delete-todo-click"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              className="btn btn-primary"
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}
    </ListGroup.Item>
  );
}