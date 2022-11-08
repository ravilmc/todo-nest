import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Todo } from './todo.model';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createTodo(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title, completed: false });
    return this.todoRepository.save(todo);
  }

  async updateTodoById(
    id: number,
    title: string,
    completed: boolean,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    todo.title = title;
    todo.completed = completed;
    return this.todoRepository.save(todo);
  }

  async deleteTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    return this.todoRepository.remove(todo);
  }
}
