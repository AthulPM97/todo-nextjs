// pages/api/todos.js
import dbConnect from "../../utils/dbConnect";
import Todo from "../../models/Todo";

dbConnect();

export default async (req, res) => {
  if (req.method === "POST") {
    const { text } = req.body;

    try {
      const todo = new Todo({ text });
      const result = await todo.save();
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    console.log('delete id ', id)

    try {
      const result = await Todo.findByIdAndDelete(id);
      console.log('result of deletion ', result)
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === "GET") {
    const todos = await Todo.find();
    if (todos) {
      res.status(200).json({ todos });
    } else {
      res.status(404).json({ message: "No todos found" });
    }
  }
};
