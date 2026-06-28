import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";

@Entity("student")
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: true, unique: true })
    email: string | null;

    @Column({ type: "varchar", nullable: true, unique: true })
    cpf: string | null;

    @Column({ type: "varchar", nullable: true })
    phone: string | null;

    @Column({ type: "varchar", nullable: true })
    address: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Course, (course) => course.student, { cascade: true })
    courses: Course[];
}
