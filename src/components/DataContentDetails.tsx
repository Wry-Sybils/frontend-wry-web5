import { Icon } from "@iconify/react/dist/iconify.js";
import { DataContentProps } from "../context/DataContentContext";
import { useTheme } from "../context/ThemeContext";

type DetailsProps = {
    selectedData: DataContentProps
}

export default function DataContentDetails({selectedData}: DetailsProps) {
    const { theme } = useTheme();

    return (
        <section className={`w-[50%] max-md:w-[97%] p-3 rounded-lg border ${theme === 'dark' ? 'bg-black border-aqua' : 'bg-dk-white border-black'}`}>
            <h4>
                {selectedData.title}
            </h4>
            <p>
                {selectedData.description}
            </p>
            <p>
                {selectedData.file?.name}
            </p>
            <a href={selectedData.link} target="_blank">
                <Icon icon="mdi:link" className={`text-2xl`} />
            </a>
        </section>
    )
}
