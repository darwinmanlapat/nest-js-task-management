import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  /* declaring your variable private makes your variable not susceptible to accidental change, 
  because other parts of your code can't directly manipulate the variable without accesing it 
  through the interface you've set. This is an example of Encapsulation in OOP, using this pattern
  allows you to limit the access & action to the variable */

  constructor(private readonly tasksRepository: TasksRepository) {}

  // In TypeScript, a class method is public by default, so public accessor is unnecessary
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id, userId: user.id });

    if (!task) {
      throw new NotFoundException(`Task with an id of ${id} is not found`);
    }
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, userId: user.id });
    if (!result.affected) {
      throw new NotFoundException(`Task with an id of ${id} is not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.getTaskById(id, user);
    task.status = status;
    const result = await this.tasksRepository.save(task);

    if (!result) {
      throw new ServiceUnavailableException();
    }
    return result;
  }
}
