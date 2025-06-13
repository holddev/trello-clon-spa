// components/TagInput.tsx
import { useState } from "react";
import { Badge } from "./UI/Badge";
import { ColorPickerButton } from "./ColorPickerButton";
import type { Tag } from "../types/types";
import { PlusIcon, XIcon } from "lucide-react";
import { Input } from "./UI/Input";

interface Props {
  initialTags?: Tag[];
  onChange: (tags: Tag[]) => void;
}

export const TagInput = ({ initialTags = [], onChange }: Props) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#ff0000");

  const addTag = () => {
    if (!newTagName.trim()) return;

    const newTag = { name: newTagName, color: newTagColor };
    const updatedTags = [...tags, newTag];

    setTags(updatedTags);
    setNewTagName("");
    onChange(updatedTags);
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Nombre"
          className="text-xs w-28 border rounded px-2 py-1"
        />

        {/* Tu color picker personalizado */}
        <ColorPickerButton
          color={newTagColor}
          onChange={setNewTagColor}
        />


        <button
          type="button"
          onClick={addTag}
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1 mt-1">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className="text-white/90 text-xs font-semibold flex items-center gap-1"
            style={{ backgroundColor: tag.color }}
          >
            {tag.name}
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => removeTag(index)}
            >
              <XIcon className="size-4 stroke-3" />
            </button>
          </Badge>

        ))}
      </div>
    </div>
  );
};