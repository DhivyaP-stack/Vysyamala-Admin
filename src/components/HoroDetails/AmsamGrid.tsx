import React, { useState, useEffect } from 'react';
import { RiDraggable } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

interface AmsamGridProps {
  centerLabel: string;
  onAmsamContentsChange: (contents: string) => void;
}

interface Label {
  id: number;
  name: string;
}

const AmsamGrid: React.FC<AmsamGridProps> = ({
  centerLabel,
  onAmsamContentsChange,
}) => {
  const initialLabels: Label[] = [
    { id: 1, name: "Sun/Suriyan" },
    { id: 2, name: "Moon/Chandran" },
    { id: 3, name: "Raghu/Rahu" },
    { id: 4, name: "Kethu/Ketu" },
    { id: 5, name: "Mars/Chevai" },
    { id: 6, name: "Venus/Sukran" },
    { id: 7, name: "Jupiter/Guru" },
    { id: 8, name: "Mercury/Budhan" },
    { id: 9, name: "Saturn/Sani" },
    { id: 10, name: "Lagnam" },
  ];

  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [amsamContents, setAmsamContents] = useState<string[][]>(Array(12).fill([]));

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, label: Label) => {
    e.dataTransfer.setData('labelId', label.id.toString());
    e.dataTransfer.setData('source', 'amsam');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData('labelId');
    const source = e.dataTransfer.getData('source');

    if (source === 'amsam' && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId),
      );
      if (
        draggedLabel &&
        !amsamContents[index].includes(draggedLabel.name) &&
        amsamContents[index].length < 6
      ) {
        const newContents = [...amsamContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setAmsamContents(newContents);

        setLabels((prevLabels) =>
          prevLabels.filter((label) => label.id !== draggedLabel.id),
        );
      }
    }
  };

  const handleRemoveLabel = (index: number, labelIndex: number) => {
    const newContents = [...amsamContents];
    const removedLabel = newContents[index][labelIndex];
    newContents[index].splice(labelIndex, 1);
    setAmsamContents(newContents);

    const removedLabelObj = initialLabels.find(
      (label) => label.name === removedLabel,
    );
    if (removedLabelObj) {
      setLabels((prevLabels) => [...prevLabels, removedLabelObj]);
    }
  };

  useEffect(() => {
    const formatGridData = (gridContents: string[][]) => {
      const formattedData = gridContents.map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents.map(label =>
          initialLabels.find(l => l.name === label)?.id
        ).filter(id => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
      }).join(", ");
      return `{${formattedData}}`;
    };

    onAmsamContentsChange(formatGridData(amsamContents));
  }, [amsamContents, onAmsamContentsChange, initialLabels]);

  const resStatus = sessionStorage.getItem('responseStatus');
  useEffect(() => {
    if (resStatus === '201') {
      setAmsamContents(Array(12).fill([]));
      setLabels(initialLabels);
      setTimeout(() => {
        sessionStorage.removeItem('responseStatus');
      }, 3000);
    }
  }, [resStatus]);

  return (
    <div className="flex justify-start items-start bg-gray-200 space-x-16 max-md:flex-col max-md:space-x-0">
      {/* Labels */}
      <div className="flex flex-col space-y-2 max-md:grid max-md:grid-cols-2 max-md:justify-start max-md:gap-2 max-md:flex-wrap max-md:mb-4">
        {labels.map((label, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, label)}
            className="flex items-center bg-yellow text-black text-xs px-2 py-2 rounded text-center font-medium hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
          >
            <RiDraggable className="mr-2" />
            {label.name}
          </div>
        ))}
      </div>

      {/* Amsam Grid */}
      <div className="">
        <div className="col-span-3 grid grid-cols-4 text-[#000000e6] font-medium gap-2">
          {/* Corrected grid positions to match AmsamGridnew */}
          {[
            { row: 1, col: 1 }, // Grid 1
            { row: 1, col: 2 }, // Grid 2
            { row: 1, col: 3 }, // Grid 3
            { row: 1, col: 4 }, // Grid 4
            { row: 2, col: 4 }, // Grid 5
            { row: 3, col: 4 }, // Grid 6
            { row: 4, col: 4 }, // Grid 7
            { row: 4, col: 3 }, // Grid 8
            { row: 4, col: 2 }, // Grid 9
            { row: 4, col: 1 }, // Grid 10
            { row: 3, col: 1 }, // Grid 11
            { row: 2, col: 1 }  // Grid 12
          ].map((pos, index) => (
            <div
              key={index}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
              onDrop={(e) => handleDropRasiBox(e, index)}
              onDragOver={handleDragOver}
              className="relative w-28 h-28 rasi-box message-box rounded bg-yellow-100 border border-yellow-400 flex flex-col items-start justify-center space-y-2
              2xl:w-28 2xl:h-28
              max-2xl:w-[92px] max-2xl:h-[92px]
              max-xl:w-[100px] max-xl:h-[100px]
              max-lg:w-[120px] max-lg:h-[120px]
              max-md:h-36 max-md:w-36
              max-sm:h-16 max-sm:w-16"
            >
              {amsamContents[index].map((label, labelIndex) => (
                <div
                  key={labelIndex}
                  className="w-24 h-auto mx-auto relative bg-white text-[9px] px-1 py-1 my-1 text-center font-semibold flex items-center justify-between max-2xl:w-[80px]"
                >
                  <span className="flex-1 truncate text-left">{label}</span>
                  <AiOutlineClose
                    className="cursor-pointer ml-2"
                    onClick={() => handleRemoveLabel(index, labelIndex)}
                  />
                </div>
              ))}
            </div>
          ))}

          <div
            className="row-start-2 amsam-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center"
          >
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmsamGrid;