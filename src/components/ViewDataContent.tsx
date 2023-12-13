import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDataContent, DataContentProps } from "../context/DataContentContext";
import { useTheme } from "../context/ThemeContext";
import Modal from "../utils/Modal";
import DataContentDetails from "./DataContentDetails";
import ToggleButton from "./ToggleButton";

export default function ViewDataContent() {
  const { theme } = useTheme();
  const { dataContent, deleteDataContent } = useDataContent();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<DataContentProps | null>(null);

  function handleModalOpen(item: DataContentProps) {
    setSelectedData(item);
    setOpen(true);
  }

  function deleteData(id: string) {
    deleteDataContent(id);
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type;
    switch (fileType) {
      case "pdf":
        return <Icon icon="fluent:document-pdf-20-regular" className={`text-8xl ${theme === "dark" ? "" : ""}`} />;
      case ".jpeg":
      case ".png":
      case ".gif":
        return <Icon icon="fluent:document-image-16-regular" className={`text-8xl`} />;
      case "msword":
      case "vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Icon icon="ph:files" />;

      default:
        return <Icon icon="grommet-icons:document-txt" className={`text-8xl`} />;
    }
  };

  return (
    <>
      {dataContent.map((item) => (
        <section
          key={item.id}
          className={`relative h-[12em] max-w-[10em] basis-[10em] grow overflow-hidden flex flex-col items-center justify-center gap-3 cursor-pointer text-center rounded-lg transition-colors
          ${theme === "dark" ? "bg-tr-gray hover:bg-tr-white" : "bg-gray hover:bg-tr-gray"}`}
          onClick={() => handleModalOpen(item)}
        >
          <span className="px-0 py-5 text-dk-white">{item.file && getFileIcon(item.file)}</span>
          <h4 className={`w-full py-3 font-taruno self-center justify-center text-sm mt-auto font-semibold uppercase bg-black ${theme === "dark" ? "" : "text-white"}`}>{item.title}</h4>

          <ToggleButton
            type="button"
            children={<Icon icon="ion:trash-bin" className="text-2xl text-pink" />}
            ariaLabel="Delete Content"
            className="bg-tr-black rounded-full absolute top-2 left-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              deleteData(item.id);
            }}
          />
        </section>
      ))}

      <Modal
        open={open}
        setOpen={(value) => setOpen(value)}
        children={selectedData && <DataContentDetails selectedData={selectedData} />}
      />
    </>
  );
}
