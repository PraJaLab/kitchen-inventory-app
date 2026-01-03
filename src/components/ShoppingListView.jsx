import React from 'react';
import { ingredients } from '../data/ingredients';
import { Share2, Copy, CheckCircle } from 'lucide-react';

const ShoppingListView = ({ results, onReset }) => {
    const missingItems = ingredients.filter(item => results[item.id] === 'missing');

    const copyToClipboard = () => {
        const text = "Shopping List:\n" + missingItems.map(item => `- ${item.nameEn} (${item.nameHi})`).join('\n');
        navigator.clipboard.writeText(text);
        alert('List copied to clipboard!');
    };

    return (
        <div className="shopping_list_container">
            <h1>Shopping List</h1>
            {missingItems.length === 0 ? (
                <div className="empty_state">
                    <CheckCircle size={64} color="#4bb543" />
                    <p>Everything is in stock! Great job.</p>
                </div>
            ) : (
                <ul className="shopping_list">
                    {missingItems.map(item => (
                        <li key={item.id} className="list_item">
                            <img src={item.image} alt={item.nameEn} className="list_thumb" />
                            <div className="list_info">
                                <span className="list_name_en">{item.nameEn}</span>
                                <span className="list_name_hi">{item.nameHi}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="actions">
                {missingItems.length > 0 && (
                    <button className="btn_primary" onClick={copyToClipboard}>
                        <Copy size={20} /> Copy List
                    </button>
                )}
                <button className="btn_secondary" onClick={onReset}>
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default ShoppingListView;
