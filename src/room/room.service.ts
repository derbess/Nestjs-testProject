import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.model';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room) private roomRepository: typeof Room){}


    async createRoom(dto: CreateRoomDto){
        const id = "_" + Math.random().toString(36).substr(2,9)
        dto["id"] = id;
        const room = await this.roomRepository.create(dto);
        return room;
    }
    
    async getAllRoom() {
        const rooms = await this.roomRepository.findAll({include: { all: true}});
        return rooms;
    }

    async getRoomById(id: string) {
        const room = await this.roomRepository.findOne({where: {id}});
        return room;
    }


}
