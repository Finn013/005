import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Link, 
  Table, 
  Save, 
  Undo, 
  Redo,
  Type,
  Palette,
  Image,
  FileText
} from 'lucide-react';

interface RibbonMenuProps {
  onFormatText: (command: string, value?: string) => void;
  onSave: () => void;
  onInsertTable: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
}

export const RibbonMenu: React.FC<RibbonMenuProps> = ({
  onFormatText,
  onSave,
  onInsertTable,
  onInsertLink,
  onInsertImage,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const fontSizeRef = useRef<HTMLSelectElement>(null);

  const handleColorChange = () => {
    if (colorInputRef.current) {
      onFormatText('foreColor', colorInputRef.current.value);
    }
  };

  const handleFontSizeChange = () => {
    if (fontSizeRef.current) {
      onFormatText('fontSize', fontSizeRef.current.value);
    }
  };

  return (
    <div className="bg-white border-b border-gray-300 shadow-sm">
      {/* Главная панель инструментов */}
      <div className="px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Группа: Файл */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
                       hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
              title="Сохранить (Ctrl+S)"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Сохранить</span>
            </button>
          </div>

          {/* Группа: Отмена/Повтор */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('undo')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Отменить (Ctrl+Z)"
            >
              <Undo size={16} />
            </button>
            <button
              onClick={() => onFormatText('redo')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Повторить (Ctrl+Y)"
            >
              <Redo size={16} />
            </button>
          </div>

          {/* Группа: Шрифт */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <select
              ref={fontSizeRef}
              onChange={handleFontSizeChange}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Размер шрифта"
            >
              <option value="1">8pt</option>
              <option value="2">10pt</option>
              <option value="3" selected>12pt</option>
              <option value="4">14pt</option>
              <option value="5">18pt</option>
              <option value="6">24pt</option>
              <option value="7">36pt</option>
            </select>
            
            <div className="relative">
              <button
                onClick={() => colorInputRef.current?.click()}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Цвет текста"
              >
                <Palette size={16} />
              </button>
              <input
                ref={colorInputRef}
                type="color"
                onChange={handleColorChange}
                className="absolute opacity-0 w-0 h-0"
                defaultValue="#000000"
              />
            </div>
          </div>

          {/* Группа: Форматирование */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('bold')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Жирный (Ctrl+B)"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => onFormatText('italic')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Курсив (Ctrl+I)"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => onFormatText('underline')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Подчеркнутый (Ctrl+U)"
            >
              <Underline size={16} />
            </button>
          </div>

          {/* Группа: Выравнивание */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('justifyLeft')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="По левому краю"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => onFormatText('justifyCenter')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="По центру"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => onFormatText('justifyRight')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="По правому краю"
            >
              <AlignRight size={16} />
            </button>
          </div>

          {/* Группа: Списки */}
          <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
            <button
              onClick={() => onFormatText('insertUnorderedList')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Маркированный список"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => onFormatText('insertOrderedList')}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Нумерованный список"
            >
              <ListOrdered size={16} />
            </button>
          </div>

          {/* Группа: Вставка */}
          <div className="flex items-center gap-1">
            <button
              onClick={onInsertLink}
              className="flex items-center gap-1 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Вставить ссылку"
            >
              <Link size={16} />
              <span className="hidden md:inline text-sm">Ссылка</span>
            </button>
            <button
              onClick={onInsertTable}
              className="flex items-center gap-1 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Вставить таблицу"
            >
              <Table size={16} />
              <span className="hidden md:inline text-sm">Таблица</span>
            </button>
            <button
              onClick={onInsertImage}
              className="flex items-center gap-1 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Вставить изображение"
            >
              <Image size={16} />
              <span className="hidden md:inline text-sm">Изображение</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};