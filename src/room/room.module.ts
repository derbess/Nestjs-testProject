import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from 'src/reservation/reservation.model';
import { RoomController } from './room.controller';
import { Room } from './room.model';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [
    SequelizeModule.forFeature([Room, Reservation]),
  ],
  exports: [
    RoomService
  ]
})
export class RoomModule {}
