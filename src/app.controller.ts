import { Controller, Delete, Get, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { Todo } from './todo.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getHello(): Promise<Todo[]> {
    return this.appService.getTodos();
  }

  @Get('/todos/:id')
  getTodo(@Param('id') id: string): Promise<Todo> {
    return this.appService.getTodoById(+id);
  }

  @Post('/todos')
  createTodo(@Body() body: { title: string }) {
    return this.appService.createTodo(body.title);
  }

  @Post('/todos/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: { title: string; completed: boolean },
  ) {
    return this.appService.updateTodoById(+id, body.title, body.completed);
  }

  @Delete('/todos/:id')
  deleteTodo(@Param('id') id: string) {
    return this.appService.deleteTodoById(+id);
  }
}
