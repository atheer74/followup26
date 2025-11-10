
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Tabs } from './components/Tabs.tsx';
import { InputTab } from './components/InputTab.tsx';
import { ReportsTab } from './components/ReportsTab.tsx';
import { StatsTab } from './components/StatsTab.tsx';
import { CollaborationTab } from './components/CollaborationTab.tsx';
import { EditModal } from './components/EditModal.tsx';
import { MessageContainer } from './components/Message.tsx';
import { useMemos } from './hooks/useMemos.ts';
import type { Memo, Tab, Message as MessageType } from './types.ts';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
    const { 
        memos, 
        addMemo, 
        updateMemo, 
        deleteMemo, 
        senderEntities,
        setSenderEntities,
        replaceAllData,
        loading,
        sessionKey,
        setSessionKey,
        isConnected
    } = useMemos();
    
    const [currentTab, setCurrentTab] = useState<Tab>('input');
    const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [initialReportSearch, setInitialReportSearch] = useState('');
    
    const showMessage = useCallback((text: string, type: MessageType['type'] = 'success') => {
        const id = Date.now();
        setMessages(prev => [...prev, { id, text, type }]);
        setTimeout(() => {
            setMessages(prev => prev.filter(msg => msg.id !== id));
        }, 5000);
    }, []);

    const handleAlertClick = useCallback((memo: Memo) => {
        setCurrentTab('reports');
        setInitialReportSearch(memo.doc_num);
    }, []);

    const handleEdit = (memo: Memo) => {
        setEditingMemo(memo);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMemo(id);
            showMessage('تم حذف المذكرة بنجاح', 'success');
        } catch (e: any) {
            showMessage(e.message || 'فشل حذف المذكرة.', 'error');
        }
    };

    const handleUpdate = async (updatedMemo: Memo) => {
        try {
            await updateMemo(updatedMemo);
            setEditingMemo(null);
            showMessage('تم تحديث المذكرة بنجاح', 'success');
        } catch (e: any) {
            setEditingMemo(null); // Close modal even on error
            showMessage(e.message || 'فشل تحديث المذكرة.', 'error');
        }
    };
    
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-100 text-slate-600">
                <Loader2 className="w-16 h-16 animate-spin text-blue-500 mb-4" />
                <p className="text-xl font-semibold">جاري تحميل البيانات...</p>
            </div>
        );
    }
    
    const renderTabContent = () => {
        switch (currentTab) {
            case 'input':
                return <InputTab 
                    addMemo={addMemo} 
                    showMessage={showMessage} 
                    senderEntities={senderEntities}
                    setSenderEntities={setSenderEntities}
                    isConnected={isConnected}
                     />;
            case 'reports':
                return <ReportsTab 
                    memos={memos} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    initialSearch={initialReportSearch}
                    clearInitialSearch={() => setInitialReportSearch('')}
                />;
            case 'stats':
                return <StatsTab memos={memos} />;
            case 'collaboration':
                return <CollaborationTab
                    showMessage={showMessage}
                    memos={memos}
                    senderEntities={senderEntities}
                    replaceAllData={replaceAllData}
                    sessionKey={sessionKey}
                    setSessionKey={setSessionKey}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-full">
            <Header memos={memos} onAlertClick={handleAlertClick} />
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </main>
            {editingMemo && (
                <EditModal
                    memo={editingMemo}
                    onClose={() => setEditingMemo(null)}
                    onSave={handleUpdate}
                    senderEntities={senderEntities}
                    isConnected={isConnected}
                />
            )}
            <MessageContainer messages={messages} />
        </div>
    );
};

export default App;