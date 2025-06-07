import React, { useState, useRef } from 'react';
import { TabsContainer } from './components/TabsContainer';
import { RibbonMenu } from './components/RibbonMenu';
import { Note } from './types';

function App() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Новый документ', content: '' }
  ]);
  const [currentNoteId, setCurrentNoteId] = useState<string>('1');
  const editorRef = useRef<HTMLDivElement>(null);

  const onSwitchNote = (noteId: string) => {
    setCurrentNoteId(noteId);
  };

  const onDeleteTab = (noteId: string) => {
    if (notes.length <= 1) return;
    
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (currentNoteId === noteId) {
      setCurrentNoteId(updatedNotes[0].id);
    }
  };

  const onAddTab = () => {
    const newId = Date.now().toString();
    const newNote: Note = {
      id: newId,
      title: `Документ ${notes.length + 1}`,
      content: ''
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
    setCurrentNoteId(newId);
  };

  const currentNote = notes.find(note => note.id === currentNoteId);

  const updateNoteContent = (content: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === currentNoteId 
          ? { ...note, content }
          : note
      )
    );
  };

  const updateNoteTitle = (title: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === currentNoteId 
          ? { ...note, title }
          : note
      )
    );
  };

  // Функции для форматирования текста
  const handleFormatText = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      
      // Обновляем содержимое заметки
      const content = editorRef.current.innerHTML;
      updateNoteContent(content);
    }
  };

  const handleSave = () => {
    if (currentNote) {
      // Имитация сохранения - можно заменить на реальную логику сохранения
      const blob = new Blob([currentNote.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentNote.title}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Показываем уведомление
      alert('Документ сохранен!');
    }
  };

  const handleInsertTable = () => {
    const rows = prompt('Количество строк:', '3');
    const cols = prompt('Количество столбцов:', '3');
    
    if (rows && cols) {
      let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
      
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML += '<td style="padding: 8px; border: 1px solid #ccc;">&nbsp;</td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table>';
      
      handleFormatText('insertHTML', tableHTML);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Введите URL:');
    const text = prompt('Введите текст ссылки:');
    
    if (url && text) {
      const linkHTML = `<a href="${url}" target="_blank">${text}</a>`;
      handleFormatText('insertHTML', linkHTML);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Введите URL изображения:');
    const alt = prompt('Введите описание изображения:') || 'Изображение';
    
    if (url) {
      const imgHTML = `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
      handleFormatText('insertHTML', imgHTML);
    }
  };

  // Обработка изменений в редакторе
  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      updateNoteContent(content);
    }
  };

  // Обработка горячих клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          handleSave();
          break;
        case 'b':
          e.preventDefault();
          handleFormatText('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormatText('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormatText('underline');
          break;
        case 'z':
          e.preventDefault();
          handleFormatText('undo');
          break;
        case 'y':
          e.preventDefault();
          handleFormatText('redo');
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TabsContainer
        notes={notes}
        currentNoteId={currentNoteId}
        onSwitchNote={onSwitchNote}
        onDeleteTab={onDeleteTab}
        onAddTab={onAddTab}
      />
      
      <RibbonMenu
        onFormatText={handleFormatText}
        onSave={handleSave}
        onInsertTable={handleInsertTable}
        onInsertLink={handleInsertLink}
        onInsertImage={handleInsertImage}
      />
      
      <div className="flex-1 bg-white">
        {currentNote && (
          <div className="h-full flex flex-col">
            {/* Заголовок документа */}
            <div className="border-b border-gray-200 p-4">
              <input
                type="text"
                value={currentNote.title}
                onChange={(e) => updateNoteTitle(e.target.value)}
                className="text-2xl font-bold w-full border-none outline-none bg-transparent"
                placeholder="Название документа..."
              />
            </div>
            
            {/* Область редактирования */}
            <div className="flex-1 p-4">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                onKeyDown={handleKeyDown}
                dangerouslySetInnerHTML={{ __html: currentNote.content }}
                className="w-full h-full outline-none text-gray-800 leading-relaxed"
                style={{ 
                  minHeight: 'calc(100vh - 300px)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
                suppressContentEditableWarning={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;