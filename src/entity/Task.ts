import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    // Tempo que a tarefa vai demorar para ser feita em horas
    @Column()
    task_time: number;

    // Pessoa responsavel pela tarefa
    @Column({nullable: true })
    incharge_person: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    create_date: Date;

    @Column({ type: "timestamp", nullable: true })
    delete_date: Date;

    @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    update_date: Date;

    @Column({ type: "boolean", default: false })
    started: boolean;
}
