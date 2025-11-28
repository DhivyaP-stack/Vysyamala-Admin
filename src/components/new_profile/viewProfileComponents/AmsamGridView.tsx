// import React, { useState, useEffect, useMemo } from "react";
// import { RiDraggable } from "react-icons/ri";
// //import { AiOutlineClose } from "react-icons/ai";


// interface AmsamGridProps {
//   centerLabel: string;
//   rasiTemp: any
//   data:any;

// }

// interface Label {
//   id: number;
//   name: string;
// }

// const AmsamGridview: React.FC<AmsamGridProps> = ({ centerLabel, rasiTemp,data }) => {
//   const initialLabels: Label[] = useMemo(
//     () => [
//       { id: 8, name: "Raghu/Rahu" },
//       { id: 3, name: "Mars/Chevai" },
//       { id: 5, name: "Jupiter/Guru" },
//       { id: 4, name: "Mercury/Budhan" },
//       { id: 7, name: "Saturn/Sani" },
//       { id: 10, name: "Lagnam" },
//       { id: 1, name: "Sun/Suriyan" },
//       { id: 6, name: "Venus/Sukran" },
//       { id: 2, name: "Moon/Chandran" },
//       { id: 9, name: "Kethu/Ketu" },
//     ],
//     []
//   );

//   const [labels, setLabels] = useState<Label[]>(initialLabels);
//   const [amsamContents, setAmsamContents] = useState<string[][]>(
//     Array(12).fill([])
//   );



//   // const formattedDatamsamval = sessionStorage.getItem("formattedDatamsam");

//   useEffect(() => {
//     // Only update sessionStorage when "data" changes
//     if (data) {
//       sessionStorage.setItem("formattedDatamsam", data);
//     }
//   }, [data]);




//   useEffect(() => {
//     const formattedDatarasival = sessionStorage.getItem("formattedDatamsam");
//     if (formattedDatarasival) {
//       const parsedData = formattedDatarasival
//         .slice(1, -1)
//         .split(", ")
//         .map((grid) => {
//           const match = grid.match(/Grid \d+: (.+)/);
//           return match
//             ? match[1].split(",").map((id) => parseInt(id, 10))
//             : [];
//         });

//       const newRasiContents = parsedData.map((ids) =>
//         ids
//           .map((id) => initialLabels.find((label) => label.id === id)?.name)
//           .filter(Boolean) as string[]
//       );
//       setAmsamContents(newRasiContents);

//       const usedIds = parsedData.flat();
//       setLabels((prevLabels) =>
//         prevLabels.filter((label) => !usedIds.includes(label.id))
//       );
//     }
//   }, [initialLabels]); // Only run when "initialLabels" changes




//   const handleDragStart = (
//     e: React.DragEvent<HTMLDivElement>,
//     label: Label
//   ) => {
//     e.dataTransfer.setData("labelId", label.id.toString());
//     e.dataTransfer.setData("source", "amsam");
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDropRasiBox = (
//     e: React.DragEvent<HTMLDivElement>,
//     index: number
//   ) => {
//     e.preventDefault();
//     const draggedLabelId = e.dataTransfer.getData("labelId");
//     const source = e.dataTransfer.getData("source");

//     if (source === "amsam" && draggedLabelId) {
//       const draggedLabel = labels.find(
//         (label) => label.id === parseInt(draggedLabelId, 10)
//       );
//       if (
//         draggedLabel &&
//         !amsamContents[index].includes(draggedLabel.name) &&
//         amsamContents[index].length < 6
//       ) {
//         const newContents = [...amsamContents];
//         newContents[index] = [...newContents[index], draggedLabel.name];
//         setAmsamContents(newContents);

//         setLabels((prevLabels) =>
//           prevLabels.filter((label) => label.id !== draggedLabel.id)
//         );
//       }
//     }
//   };

// //   const handleRemoveLabel = (index: number, labelIndex: number) => {
// //     // Create a copy of the current amsamContents state
// //     const newContents = [...amsamContents];
// //     const removedLabel = newContents[index][labelIndex];

// //     // Remove the label from the copied state
// //     newContents[index].splice(labelIndex, 1);
// //     setAmsamContents(newContents);

// //     // Find the removed label object from the initialLabels
// //     const removedLabelObj = initialLabels.find(
// //       (label) => label.name === removedLabel
// //     );

// //     // If the removed label object is found
// //     if (removedLabelObj) {
// //       setLabels((prevLabels) => {
// //         // Check if the label already exists in the state
// //         if (prevLabels.some((label) => label.name === removedLabel)) {
// //           return prevLabels; // Return the current state if label is already present
// //         }
// //         // Add the label to the state if it's not already present
// //         return [...prevLabels, removedLabelObj];
// //       });
// //     }
// //   };


//   const formatGridData = () => {
//     const formattedData = amsamContents
//       .map((contents, index) => {
//         const boxNumber = index + 1;
//         const ids = contents
//           .map((label) => initialLabels.find((l) => l.name === label)?.id)
//           .filter((id) => id !== undefined);
//         return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
//       })
//       .join(", ");
//     return `{${formattedData}}`;
//   };

//   useEffect(() => {
//     const formattedData = formatGridData();
//     console.log("Amsam Contents:");
//     console.log(formattedData);

//     // Store formattedData in sessionStorage
//     sessionStorage.setItem("formattedData1", JSON.stringify(formattedData));
//   }, [amsamContents]);

//   return (
//     <div className="flex justify-start items-start bg-gray-200 space-x-16">
//       {/* Labels */}
//       <div className="flex flex-col space-y-2">
//         {rasiTemp !== "1" && labels.map((label, index) => (
//           <div
//             key={index}
//             draggable
//             onDragStart={(e) => handleDragStart(e, label)}
//             className="flex items-center bg-red-500 text-sm px-2 py-3 rounded text-center hover:cursor-grab"
//           >
//             <RiDraggable className="mr-2" />
//             {label.name}
//           </div>
//         ))}

//       </div>

//       {/* Amsam Grid */}
//       <div className="">
//         {/* Top Row */}
//         <div className="col-span-3 grid grid-cols-4 gap-2">
//           {/* Define positions for the grid in a clockwise manner */}
//           {[
//             { row: 1, col: 1 },
//             { row: 1, col: 2 },
//             { row: 1, col: 3 },
//             { row: 1, col: 4 },
//             { row: 2, col: 4 },
//             { row: 3, col: 4 },
//             { row: 4, col: 4 },
//             { row: 4, col: 3 },
//             { row: 4, col: 2 },
//             { row: 4, col: 1 },
//             { row: 3, col: 1 },
//             { row: 2, col: 1 },
//           ]?.map((pos, index) => (
//             <div
//               key={index}
//               style={{ gridRow: pos.row, gridColumn: pos.col }}
//               onDrop={(e) => handleDropRasiBox(e, index)}
//               onDragOver={handleDragOver}
//               className="w-48 h-48 amsam-box rounded border border-footer-text-gray flex flex-col items-start justify-center gap-2"
//             >
//               {amsamContents[index]?.map((label, labelIndex) => (
//                 <div
//                   key={labelIndex}
//                   className="w-32 h-auto mx-auto relative bg-red-500 text-white  text-xs px-2 py-1 rounded text-center flex items-center justify-between"
//                 >
//                   {label}
//                   {/* <AiOutlineClose
//                     className="cursor-pointer ml-2"
//                     onClick={() => handleRemoveLabel(index, labelIndex)}
//                   /> */}
//                 </div>
//               ))}
//               {/* <div className="absolute top-0 left-0 m-1 text-xs font-bold text-gray-500">
//                 {index + 1}
//               </div> */}
//             </div>
//           ))}

//           <div className="row-start-2 amsam-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center">
//             {centerLabel}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AmsamGridview;



import React, { useState, useEffect, useMemo } from "react";
import { RiDraggable } from "react-icons/ri";
//import { AiOutlineClose } from "react-icons/ai";


interface AmsamGridProps {
  centerLabel: string;
  rasiTemp: any
  data: any;

}

interface Label {
  id: number;
  name: string;
}

const AmsamGridview: React.FC<AmsamGridProps> = ({ centerLabel, rasiTemp, data }) => {
  const initialLabels: Label[] = useMemo(
    () => [
      // { id: 8, name: "Raghu/Rahu" },
      // { id: 3, name: "Mars/Chevai" },
      // { id: 5, name: "Jupiter/Guru" },
      // { id: 4, name: "Mercury/Budhan" },
      // { id: 7, name: "Saturn/Sani" },
      // { id: 10, name: "Lagnam" },
      // { id: 1, name: "Sun/Suriyan" },
      // { id: 6, name: "Venus/Sukran" },
      // { id: 2, name: "Moon/Chandran" },
      // { id: 9, name: "Kethu/Ketu" },

      { id: 1, name: "Sun/Suriyan" },
      { id: 2, name: "Moon/Chandran" },
      { id: 3, name: "Raghu/Rahu" },
      { id: 4, name: "Kethu/Ketu" },
      { id: 5, name: "Mars/Chevai" },
      { id: 6, name: "Venus/Sukran" },
      { id: 7, name: "Jupiter/Guru" },
      { id: 8, name: "Mercury/Budhan" },
      { id: 8, name: "Raghu/Rahu" },
      { id: 9, name: "Saturn/Sani" },
      { id: 10, name: "Lagnam" },
    ],
    []
  );

  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [amsamContents, setAmsamContents] = useState<string[][]>(
    Array(12).fill([])
  );



  // const formattedDatamsamval = sessionStorage.getItem("formattedDatamsam");

  useEffect(() => {
    // Only update sessionStorage when "data" changes
    if (data) {
      localStorage.setItem("formattedDatamsam", data);
      sessionStorage.setItem("formattedDatamsam", data);
    }
  }, [data]);




  useEffect(() => {
    const formattedDatarasival = sessionStorage.getItem("formattedDatamsam") || localStorage.getItem("formattedDatamsam");
    if (formattedDatarasival) {
      const parsedData = formattedDatarasival
        .slice(1, -1)
        .split(", ")
        .map((grid) => {
          const match = grid.match(/Grid \d+: (.+)/);
          return match
            ? match[1].split(",").map((id) => parseInt(id, 10))
            : [];
        });

      const newRasiContents = parsedData.map((ids) =>
        ids
          .map((id) => initialLabels.find((label) => label.id === id)?.name)
          .filter(Boolean) as string[]
      );
      setAmsamContents(newRasiContents);

      const usedIds = parsedData.flat();
      setLabels((prevLabels) =>
        prevLabels.filter((label) => !usedIds.includes(label.id))
      );
    }
  }, [initialLabels]); // Only run when "initialLabels" changes




  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    label: Label
  ) => {
    e.dataTransfer.setData("labelId", label.id.toString());
    e.dataTransfer.setData("source", "amsam");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData("labelId");
    const source = e.dataTransfer.getData("source");

    if (source === "amsam" && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10)
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
          prevLabels.filter((label) => label.id !== draggedLabel.id)
        );
      }
    }
  };

  //   const handleRemoveLabel = (index: number, labelIndex: number) => {
  //     // Create a copy of the current amsamContents state
  //     const newContents = [...amsamContents];
  //     const removedLabel = newContents[index][labelIndex];

  //     // Remove the label from the copied state
  //     newContents[index].splice(labelIndex, 1);
  //     setAmsamContents(newContents);

  //     // Find the removed label object from the initialLabels
  //     const removedLabelObj = initialLabels.find(
  //       (label) => label.name === removedLabel
  //     );

  //     // If the removed label object is found
  //     if (removedLabelObj) {
  //       setLabels((prevLabels) => {
  //         // Check if the label already exists in the state
  //         if (prevLabels.some((label) => label.name === removedLabel)) {
  //           return prevLabels; // Return the current state if label is already present
  //         }
  //         // Add the label to the state if it's not already present
  //         return [...prevLabels, removedLabelObj];
  //       });
  //     }
  //   };


  const formatGridData = () => {
    const formattedData = amsamContents
      .map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents
          .map((label) => initialLabels.find((l) => l.name === label)?.id)
          .filter((id) => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
      })
      .join(", ");
    return `{${formattedData}}`;
  };

  useEffect(() => {
    const formattedData = formatGridData();
    console.log("Amsam Contents:");
    console.log(formattedData);

    // Store formattedData in sessionStorage
    localStorage.setItem("formattedData1", JSON.stringify(formattedData));
    sessionStorage.setItem("formattedData1", JSON.stringify(formattedData));
  }, [amsamContents]);

  return (
    <div className="flex justify-start items-start bg-gray-200 space-x-16">
      {/* Labels */}
      <div className="flex flex-col space-y-2">
        {rasiTemp == "1" && labels.map((label, index) => (
          <div
            key={index}
            // draggable
            onDragStart={(e) => handleDragStart(e, label)}
            className="flex items-center text-black font-bold bg-yellow-100 text-xs px-2 py-2 rounded text-center hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
          >
            <RiDraggable className="mr-2" />
            {label.name}
          </div>
        ))}

      </div>

      {/* Amsam Grid */}
      <div className="">
        {/* Top Row */}
        <div className="col-span-3 grid grid-cols-4 gap-2">
          {/* Define positions for the grid in a clockwise manner */}
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
          ]?.map((pos, index) => (
            <div
              key={index}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
              onDrop={(e) => handleDropRasiBox(e, index)}
              onDragOver={handleDragOver}
              className="relative w-28 h-28 rasi-box message-box rounded bg-yellow-100  border border-yellow-400 flex flex-col items-start justify-center space-y-2
              2xl:w-28 2xl:h-28
              max-2xl:w-[92px] max-2xl:h-[92px]
               max-xl:w-[100px] max-xl:h-[100px]
                max-lg:w-[120px] max-lg:h-[120px]
                 max-md:h-36 max-md:w-36
                 max-sm:h-16 max-sm:w-16"
            >
              {amsamContents[index]?.map((label, labelIndex) => (
                <div
                  key={labelIndex}
                  className="w-24 h-auto mx-auto relative bg-white text-[9px] px-1 py-1 my-1  text-center font-semibold flex items-center justify-between max-2xl:w-[80px]"
                >
                  {label}
                  {/* <AiOutlineClose
                    className="cursor-pointer ml-2"
                    onClick={() => handleRemoveLabel(index, labelIndex)}
                  /> */}
                </div>
              ))}
              {/* <div className="absolute top-0 left-0 m-1 text-xs font-bold text-gray-500">
                {index + 1}
              </div> */}
            </div>
          ))}

          <div className="row-start-2 amsam-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center">
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmsamGridview;
