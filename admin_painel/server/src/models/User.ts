import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:"varchar", nullable:false})
    name:string
    @Column({type:"varchar", nullable:false})
    password:string
}