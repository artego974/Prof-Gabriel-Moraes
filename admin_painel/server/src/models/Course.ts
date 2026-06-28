import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity("course")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    // 'comprado' | 'concluido'
    @Column({ type: "varchar", default: "comprado" })
    status: string;

    // Professor responsável pelo curso: 'gabriel' | 'arthur'
    @Column({ type: "varchar", default: "gabriel" })
    professor: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
        transformer: {
            to: (value: number) => value,
            from: (value: string | null) => (value == null ? 0 : Number(value)),
        },
    })
    value: number;

    @Column({ type: "date", nullable: true })
    date: string | null;

    @ManyToOne(() => Student, (student) => student.courses, { onDelete: "CASCADE" })
    student: Student;
}
