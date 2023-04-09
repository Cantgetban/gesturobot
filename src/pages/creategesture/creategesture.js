import React, { useState, createContext, useContext } from 'react';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MovementsLib from '../movementslib/movementslib';

// // Create a context for the drag state
// const DragContext = createContext();

// // Provider component that manages the drag state
// function DragProvider({ children }) {
//   const [isDragging, setIsDragging] = useState(false);

//   return (
//     <DragContext.Provider value={{ isDragging, setIsDragging }}>
//       {children}
//     </DragContext.Provider>
//   );
// }

// // Component that can be dragged
// function DragBox({ name }) {
//   const { setIsDragging } = useContext(DragContext);
//   const [{ opacity }, drag] = useDrag({
//     item: { type: 'box', name },
//     collect: (monitor) => ({
//       opacity: monitor.isDragging() ? 0.5 : 1,
//     }),
//     begin: () => setIsDragging(true),
//     end: () => setIsDragging(false),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{ opacity }}
//     >
//       {name}
//     </div>
//   );
// }

// // Component that displays the drag state
// function DragState() {
//   const { isDragging } = useContext(DragContext);

//   return (
//     <div>
//       {isDragging ? 'Dragging!' : 'Not dragging'}
//     </div>
//   );
//}

// App component that renders the drag provider, the draggable boxes, and the drag state
function Creategesture() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <DragProvider> */}
        <MovementsLib />
        {/* <DragState /> */}
      {/* </DragProvider> */}
    </DndProvider>
  );
}

export default Creategesture;
