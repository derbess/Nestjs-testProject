import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Post()
    create(@Body() roomDto: CreateRoomDto){
        return this.roomService.createRoom(roomDto);
    }

    @Get()
    getAll() {
        return this.roomService.getAllRoom();
    }
}
