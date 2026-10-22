import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

export interface Select2Option {
  id: string;
  label: string;
  count?: number;
  colorHex?: string;
  subtitle?: string;
}

interface Select2MultiDropdownProps {
  label: string;
  placeholder: string;
  options: Select2Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  icon?: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const Select2MultiDropdown: React.FC<Select2MultiDropdownProps> = ({
  label,
  placeholder,
  options,
  selectedIds,
  onChange,
  icon,
  theme = 'light',
}) => {
  const darkThemeClass = theme === 'dark' ? ' select2-multi-dropdown--dark' : '';
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    const allFilteredIds = filteredOptions.map((opt) => opt.id);
    const combined = Array.from(new Set([...selectedIds, ...allFilteredIds]));
    onChange(combined);
  };

  const clearAll = () => {
    onChange([]);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));

  return (
    <div className={`relative space-y-2 select2-multi-dropdown${darkThemeClass}`} ref={dropdownRef}>
      {/* Label & Active Count Badge */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#777777]">
          {icon && <span className="text-[#F2B705]">{icon}</span>}
          <span>{label}</span>
        </label>
        {selectedIds.length > 0 && (
          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#EFEDE6] text-[#805C00] font-semibold rounded-xs">
            {selectedIds.length} selected
          </span>
        )}
      </div>

      {/* Select2 Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[42px] px-3 py-2 bg-[#FAF9F6] border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
          isOpen
            ? 'border-[#111111] ring-1 ring-[#111111] bg-white'
            : selectedIds.length > 0
            ? 'border-[#111111]/40 bg-white hover:border-[#111111]'
            : 'border-[#111111]/15 hover:border-[#111111]/40'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
      >
        {/* Selected Items Tags or Placeholder */}
        <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
          {selectedIds.length === 0 ? (
            <span className="text-[#777777] text-xs select-none">
              {placeholder}
            </span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.id}
                className="inline-flex items-center gap-1.5 pl-2 pr-1.5 py-0.5 bg-[#EFEDE6] text-[#171719] text-[11px] font-medium rounded-xs shadow-2xs shrink-0 max-w-full"
              >
                {opt.colorHex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: opt.colorHex }}
                  />
                )}
                <span className="truncate max-w-[140px]">{opt.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(opt.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      toggleOption(opt.id);
                    }
                  }}
                  className="p-0.5 text-neutral-500 hover:text-[#805C00] hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
                  aria-label={`Remove ${opt.label}`}
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            ))
          )}
        </div>

        {/* Clear Action & Chevron */}
        <div className="flex items-center gap-1.5 shrink-0 text-[#777777]">
          {selectedIds.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="p-1 hover:text-[#111111] hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
              title="Clear all selected"
              aria-label="Clear all selections"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 text-[#111111] ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Select2 Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#111111] shadow-xl z-50 rounded-xs overflow-hidden animate-in fade-in-0 zoom-in-98 duration-150">
          
          {/* Select2 Search Box inside dropdown */}
          <div className="p-2.5 border-b border-[#111111]/10 bg-[#FAF9F6]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#777777] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Type to search..."
                className="w-full pl-8 pr-7 py-1.5 bg-white border border-[#111111]/15 text-xs text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Action Toolbar */}
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono px-0.5">
              <button
                type="button"
                onClick={selectAll}
                className="text-[#111111] hover:text-[#F2B705] font-semibold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Select All ({filteredOptions.length})
              </button>
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[#777777] hover:text-red-600 font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Options List with Proper Checkboxes */}
          <div className="max-h-60 overflow-y-auto divide-y divide-[#111111]/5 py-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 px-4 text-center text-xs text-[#777777]">
                No matching options found.
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#111111]/5 text-[#111111] font-medium'
                        : 'text-[#333333] hover:bg-[#FAF9F6] hover:text-[#111111]'
                    }`}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleOption(opt.id);
                      }
                    }}
                  >
                    {/* Left: Proper Checkbox + Color Swatch (if any) + Label */}
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {/* Proper Architectural Custom Checkbox */}
                      <div
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#F2B418] border-[#946B00] text-[#171719]'
                            : 'bg-white border-[#111111]/30 hover:border-[#111111]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Finish Color Swatch Dot */}
                      {opt.colorHex && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-xs"
                          style={{ backgroundColor: opt.colorHex }}
                        />
                      )}

                      {/* Option Text */}
                      <span className="truncate">{opt.label}</span>
                    </div>

                    {/* Right: Count Badge */}
                    {typeof opt.count === 'number' && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 shrink-0 ${
                          isSelected
                            ? 'bg-[#EFEDE6] text-[#805C00] font-semibold'
                            : 'bg-[#111111]/5 text-[#777777]'
                        }`}
                      >
                        {opt.count}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Bar: Done button */}
          <div className="p-2 border-t border-[#111111]/10 bg-[#FAF9F6] flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#777777]">
              {selectedIds.length} of {options.length} selected
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-[#F2B418] text-[#171719] hover:bg-[#FFC83A] text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
