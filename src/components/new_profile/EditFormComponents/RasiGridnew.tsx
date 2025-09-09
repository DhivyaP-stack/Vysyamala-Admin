import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RiDraggable } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

interface RasiGridProps {
  centerLabel: string;
  data: string;
  onChange: (newData: string) => void;
  isEditing: boolean;
}

interface Label {
  id: number;
  name: string;
}

const RasiGridnew: React.FC<RasiGridProps> = ({
  centerLabel,
  data,
  onChange,
  isEditing,
}) => {
  const initialLabels: Label[] = useMemo(
    () => [
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
    ],
    [],
  );

  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [rasiContents, setRasiContents] = useState<string[][]>(Array(12).fill([]));
  const [centerGridContent, setCenterGridContent] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (data) {
      const formattedDatarasival = data
        .slice(1, -1)
        .split(', ')
        .map((grid) => {
          const match = grid.match(/Grid \d+: (.+)/);
          return match && match[1] !== 'empty' ? match[1].split(',').map((id) => parseInt(id, 10)) : [];
        });

      const newRasiContents = formattedDatarasival.map((ids) => {
        return ids
          .map((id) => initialLabels.find((label) => label.id === id)?.name)
          .filter(Boolean) as string[];
      });

      setRasiContents(newRasiContents);
      setHasInteracted(true);

      const usedIds = formattedDatarasival.flat();
      setLabels((prevLabels) =>
        prevLabels.filter((label) => !usedIds.includes(label.id)),
      );
    }
  }, [data, initialLabels]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, label: Label) => {
    e.dataTransfer.setData('labelId', label.id.toString());
    e.dataTransfer.setData('source', 'rasi');
    setHasInteracted(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData('labelId');
    const source = e.dataTransfer.getData('source');

    if (source === 'rasi' && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10),
      );
      if (
        draggedLabel &&
        !rasiContents[index].includes(draggedLabel.name) &&
        rasiContents[index].length < 6
      ) {
        const newContents = [...rasiContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setRasiContents(newContents);
        setHasInteracted(true);

        setLabels((prevLabels) =>
          prevLabels.filter((label) => label.id !== draggedLabel.id),
        );

        onChange(formatGridData(newContents, centerGridContent));
      }
    }
  };

  const handleDropCenterBox = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData('labelId');

    if (draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10),
      );
      if (draggedLabel) {
        setCenterGridContent(draggedLabel.name);
        setLabels((prevLabels) =>
          prevLabels.filter((label) => label.id !== draggedLabel.id),
        );

        onChange(formatGridData(rasiContents, draggedLabel.name));
      }
    }
  };

  const handleRemoveLabel = (index: number, labelIndex: number) => {
    const newContents = [...rasiContents];
    const removedLabel = newContents[index][labelIndex];
    newContents[index].splice(labelIndex, 1);
    setRasiContents(newContents);
    setHasInteracted(true);

    const removedLabelObj = initialLabels.find(
      (label) => label.name === removedLabel,
    );
    if (removedLabelObj) {
      setLabels((prevLabels) => [...prevLabels, removedLabelObj]);
    }

    onChange(formatGridData(newContents, centerGridContent));
  };

  const handleRemoveCenterLabel = () => {
    if (centerGridContent) {
      const removedLabelObj = initialLabels.find(
        (label) => label.name === centerGridContent,
      );
      if (removedLabelObj) {
        setLabels((prevLabels) => [...prevLabels, removedLabelObj]);
      }
      setCenterGridContent(null);
      onChange(formatGridData(rasiContents, null));
    }
  };

  const formatGridData = (
    gridContents: string[][],
    centerContent: string | null,
  ) => {
    const formattedData = gridContents
      .map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents
          .map((label) => initialLabels.find((l) => l.name === label)?.id)
          .filter((id) => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(',') : 'empty'}`;
      })
      .join(', ');
    const centerData = centerContent
      ? `Center: ${initialLabels.find((l) => l.name === centerContent)?.id}`
      : 'Center: empty';
    return `{${formattedData}, ${centerData}}`;
  };

  // In both RasiGridnew and AmsamGridnew components
  useEffect(() => {
    if (data) {
      // Parse the data only if it's not empty
      if (typeof data === 'string' && data.trim() !== '') {
        const formattedData = data.slice(1, -1).split(', ').map((grid) => {
          const match = grid.match(/Grid \d+: (.+)/);
          return match && match[1] !== 'empty' ? match[1].split(',').map(id => parseInt(id, 10)) : [];
        });
        // ... rest of parsing logic ...
      }
    }
  }, [data, initialLabels]);
  return (
    <div className="flex justify-start items-start bg-gray-200 space-x-16">
      <div className="flex flex-col space-y-2">
        {isEditing && (
          <div className="flex flex-col space-y-2">
            {labels.map((label, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, label)}
                className="flex items-center bg-yellow-100 text-xs font-semibold px-2 py-2 rounded text-center hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
              >
                <RiDraggable className="mr-2" />
                {label.name}
              </div>
            ))}
            {labels.length === 0 && hasInteracted && (
              <div className="text-gray-500 italic">All items placed</div>
            )}
          </div>
        )}
      </div>

      <div className="">
        <div className="col-span-3 grid grid-cols-4 text-[#000000e6] font-medium gap-2">
          {[
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 2, col: 4 },
            { row: 3, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
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
              {rasiContents[index]?.map((label, labelIndex) => (
                <div
                  key={labelIndex}
                  className="w-24 h-auto mx-auto relative bg-white text-[9px] px-1 py-1 my-1 text-center font-semibold flex items-center justify-between max-2xl:w-[80px]"
                >
                  <span className="flex-1 truncate text-left">{label}</span>
                  {isEditing && (
                    <AiOutlineClose
                      className="cursor-pointer ml-2"
                      onClick={() => handleRemoveLabel(index, labelIndex)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          <div
            className="row-start-2 amsam-center-box col-start-2 col-end-4 row-end-4 rounded text-[#5a5959e6] font-semibold border border-gray bg-gray flex justify-center items-center"
            onDrop={handleDropCenterBox}
            onDragOver={handleDragOver}
          >
            {centerGridContent ? (
              <div className="w-32 h-auto mx-auto relative  bg-white text-[9px] px-1 py-1 rounded text-center flex items-center justify-between">
                {centerGridContent}
                {isEditing && (
                  <AiOutlineClose
                    className="cursor-pointer ml-2"
                    onClick={handleRemoveCenterLabel}
                  />
                )}
              </div>
            ) : (
              centerLabel
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasiGridnew;
