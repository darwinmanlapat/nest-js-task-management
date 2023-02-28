import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enum/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  /* declaring your variable private makes your variable not susceptible to accidental change, 
  because other parts of your code can't directly manipulate the variable without accesing it 
  through the interface you've set. This is an example of Encapsulation in OOP, using this pattern
  allows you to limit the access & action to the variable */
  // In TypeScript, a class method is public by default, so public accessor is unnecessary
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException(`Task with an id of ${id} is not found`);
    }
    return task;
  }
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with an id of ${id} is not found`);
  //   }
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   const previousTasks = this.tasks;
  //   const currentTasks = this.tasks.filter((task) => task.id !== id);
  //   if (previousTasks.length == currentTasks.length) {
  //     throw new NotFoundException();
  //   }
  // }
  // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //   const { status } = updateTaskStatusDto;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
