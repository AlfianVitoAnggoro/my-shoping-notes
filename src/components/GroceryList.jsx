import { useState } from 'react';
import Item from './Item';

export default function GroceryList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'name') {
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'checked') {
    sortedItems = items
      .map(item => ({ ...item, checked: !!item.checked }))
      .sort((a, b) => +a.checked - +b.checked);
  } else {
    sortedItems = items;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item, index) => (
            <Item
              item={item}
              key={index}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}
