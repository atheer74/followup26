export interface Memo {
    id: string;
    doc_num: string;
    memo_num: string;
    memo_date: string;
    sender_entity: string;
    subject: string;
    assigned_dept: string[];
    priority: 'Normal' | 'Urgent' | 'Immediate';
    received_date: string;
    is_completed: boolean;
    response_memo_num: string;
    response_memo_date: string;
    created_by: string;
    created_at: string;
    updated_by?: string;
    updated_at?: string;
}

export type Tab = 'input' | 'reports' | 'stats' | 'collaboration';

export interface ReminderStatus {
    status: 'Completed' | 'Overdue' | 'Imminent' | 'Normal';
    label: string;
    color: string;
}

export interface Message {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}

export interface SharedData {
    last_updated: string;
    memos: Memo[];
    senderEntities: string[];
    sessionKey?: string;
}

export interface SyncNotification {
    id: number;
    text: string;
}