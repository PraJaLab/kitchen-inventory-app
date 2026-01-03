import React, { useState, useRef } from 'react';

const IngredientCard = ({ ingredient, onSwipe }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const SWIPE_THRESHOLD = 100; // Minimum distance to trigger swipe

    const handleStart = (clientX, clientY) => {
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;
        const deltaX = clientX - startPos.x;
        const deltaY = clientY - startPos.y;
        setPosition({ x: deltaX, y: deltaY * 0.3 }); // Reduce vertical movement
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (position.x > SWIPE_THRESHOLD) {
            // Swiped Right - Available
            animateOut('right');
        } else if (position.x < -SWIPE_THRESHOLD) {
            // Swiped Left - Missing
            animateOut('left');
        } else {
            // Reset position
            setPosition({ x: 0, y: 0 });
        }
    };

    const animateOut = (direction) => {
        const flyOutX = direction === 'right' ? 500 : -500;
        setPosition({ x: flyOutX, y: 0 });

        setTimeout(() => {
            onSwipe(direction, ingredient.id);
        }, 200);
    };

    // Mouse Events
    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();
    const onMouseLeave = () => { if (isDragging) handleEnd(); };

    // Touch Events
    const onTouchStart = (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = () => handleEnd();

    const rotation = position.x * 0.05; // Slight rotation based on drag
    const opacity = Math.max(0, 1 - Math.abs(position.x) / 400);

    return (
        <div
            className="card_container"
            ref={cardRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                opacity: opacity,
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none', // Prevent scroll while swiping
            }}
        >
            <div className="card">
                <div className="card_image_container">
                    <img
                        src={ingredient.image}
                        alt={ingredient.nameEn}
                        className="card_image"
                        draggable={false}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400?text=' + ingredient.nameEn;
                        }}
                    />
                </div>
                <div className="card_content">
                    <h2 className="card_title_en">{ingredient.nameEn}</h2>
                    <h3 className="card_title_hi">{ingredient.nameHi}</h3>
                </div>

                {/* Swipe Indicators */}
                <div className="swipe_feedback" style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    right: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        background: position.x < -30 ? '#ff4b4b' : 'transparent',
                        color: 'white',
                        fontWeight: 'bold',
                        border: '2px solid #ff4b4b',
                        opacity: Math.min(1, Math.abs(Math.min(0, position.x)) / 50),
                    }}>
                        MISSING
                    </div>
                    <div style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        background: position.x > 30 ? '#4bff4b' : 'transparent',
                        color: 'white',
                        fontWeight: 'bold',
                        border: '2px solid #4bff4b',
                        opacity: Math.min(1, Math.max(0, position.x) / 50),
                    }}>
                        AVAILABLE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;
