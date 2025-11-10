
export const DEPARTMENTS: { [key: string]: string } = {
    'Technical Admin': 'الإدارة الفنية',
    'Statistics': 'الإحصاء',
    'Research': 'البحوث والدراسات',
    'DB Admin': 'إدارة قواعد البيانات',
    'GM Office': 'مكتب المدير العام',
    'Deputy Office': 'مكتب المعاون',
    'All Departments': 'جميع الأقسام'
};

export const PRIORITIES: { [key: string]: { label: string; days: number; color: string; borderColor: string; } } = {
    'Normal': { label: 'عادي', days: 3, color: 'text-sky-600', borderColor: '#0284c7' },
    'Urgent': { label: 'عاجل', days: 2, color: 'text-amber-600', borderColor: '#d97706' },
    'Immediate': { label: 'عاجل وعلى الفور', days: 1, color: 'text-red-600', borderColor: '#dc2626' }
};

export const INITIAL_SENDER_ENTITIES = [
    'وزارة التخطيط',
    'الأمانة العامة لمجلس الوزراء',
    'وزارة المالية',
    'ديوان الرقابة المالية',
    'البنك المركزي العراقي',
    'وزارة التعليم العالي',
    'وزارة التربية',
    'وزارة الصحة'
];