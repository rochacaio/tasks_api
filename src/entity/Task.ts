import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate} from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ nullable: true })
    title: string;

    // Tempo que a tarefa vai demorar para ser feita em horas
    @Column()
    task_time: number;

    // Pessoa responsavel pela tarefa
    @Column({nullable: true })
    incharge_person: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    create_date: Date;

    @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    update_date: Date;

    @Column({ type: "boolean", default: false })
    started: boolean;

    @Column({ default: false })
    completed: boolean;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = new Date();
    }
}
