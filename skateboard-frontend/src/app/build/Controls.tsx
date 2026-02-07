"use client";

import { Heading } from "@/components/Heading";
import { Part } from "@/lib/types";
import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useCustomizerControls } from "./context";
import { useRouter } from "next/navigation";

type Props = {
  wheels: Part[];
  decks: Part[];
  trucks: Part[];
  bolts: Part[];
  className?: string;
};

export default function Controls({ wheels, decks, trucks, bolts, className }: Props) {
  const router = useRouter();

  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (selectedWheel?.id) url.searchParams.set("wheel", String(selectedWheel.id));
    if (selectedDeck?.id) url.searchParams.set("deck", String(selectedDeck.id));
    if (selectedTruck?.id) url.searchParams.set("truck", String(selectedTruck.id));
    if (selectedBolt?.id) url.searchParams.set("bolt", String(selectedBolt.id));

    router.replace(url.href);
  }, [router, selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={selectedDeck?.name}>
        {decks.map((deck) => (
          <Option
            key={deck.id}
            textureUrl={deck.texture_url}
            selected={deck.id === selectedDeck?.id}
            onClick={() => setDeck(deck)}
          >
            {deck.name}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={selectedWheel?.name}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.id}
            textureUrl={wheel.texture_url}
            selected={wheel.id === selectedWheel?.id}
            onClick={() => setWheel(wheel)}
          >
            {wheel.name}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={selectedTruck?.name}>
        {trucks.map((truck) => (
          <Option
            key={truck.id}
            textureUrl={truck.texture_url}
            selected={truck.id === selectedTruck?.id}
            onClick={() => setTruck(truck)}
          >
            {truck.name}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={selectedBolt?.name}>
        {bolts.map((bolt) => (
          <Option
            key={bolt.id}
            textureUrl={bolt.texture_url}
            selected={bolt.id === selectedBolt?.id}
            onClick={() => setBolt(bolt)}
          >
            {bolt.name}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: string;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {selectedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
  textureUrl?: string | null;
};

function Option({ children, selected, textureUrl, onClick }: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
        onClick={onClick}
      >
        {textureUrl ? (
          <Image
            src={textureUrl}
            alt={String(children)}
            width={40}
            height={40}
            className="pointer-events-none h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800" />
        )}
        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
