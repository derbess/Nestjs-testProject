import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from 'src/room/room.model';
import { RoomModule } from 'src/room/room.module';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.model';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports: [
    SequelizeModule.forFeature([Room, Reservation]),
    RoomModule,
  ] 
})
export class ReservationModule {}
