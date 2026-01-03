import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import { ingredients as initialIngredients } from '../data/ingredients';
// import { ShoppingCart, RotateCcw } from 'lucide-react';

const SwipeContainer = ({ onFinish }) => {
    // We need to keep track of removed items to not show them again if re-rendering purely, 
    // but react-tinder-card handles the visual removal.
    // We maintain a list of results.

    const [results, setResults] = useState({}); // { id: 'available' | 'missing' }
    const [currentIndex, setCurrentIndex] = useState(initialIngredients.length - 1);

    const swiped = (direction, id) => {
        console.log('removing: ' + id + ' to the ' + direction);

        // Logic: Swipe Right = Available, Swipe Left = Missing
        const status = direction === 'right' ? 'available' : 'missing';

        setResults(prev => ({
            ...prev,
            [id]: status
        }));

        // Decrement index to track progress
        setCurrentIndex(prev => prev - 1);
    };

    // When all cards are swiped
    useEffect(() => {
        if (currentIndex < 0) {
            onFinish(results);
        }
    }, [currentIndex, results, onFinish]);

    // Show only the current card to simplify stacking without the library
    const currentIngredient = initialIngredients[currentIndex];

    return (
        <div className="swipe_container">
            <div className="card_stack">
                {currentIngredient && (
                    <IngredientCard
                        key={currentIngredient.id}
                        ingredient={currentIngredient}
                        onSwipe={swiped}
                    />
                )}
            </div>
            <div className="instructions">
                <p>Tap buttons to mark items</p>
            </div>
        </div>
    );
};

export default SwipeContainer;
