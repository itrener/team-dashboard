import React from "react";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  values: number[];
  min?: number;
  max: number;
  height?: number;
  color?: string;
};

const colors = ["bg-orange-300", "bg-red-500", "bg-blue-300", "bg-green-400"];

const invLerp = (from: number, to: number, value: number) =>
  (value - from) / (to - from);

export default function Bar(props: Props) {
  const min = props.min ?? 0;
  const values = props.values.map((v, i) => ({
    value: v,
    width: `${invLerp(min, props.max, v) * 100}%`,
  }));
  return (
    <div
      className={cn([
        "relative w-full overflow-visible bg-slate-100",
        props.height !== undefined ? `h-[${props.height}px]` : "h-[5px]",
      ])}
    >
      {values.map((v, i) => {
        return (
          <div
            key={`${i}_${v.value}`}
            style={{
              width: v.width,
              top: 0,
              left: i == 0 ? 0 : values.at(i - 1)?.width,
            }}
            className={cn(
              `absolute h-full transition hover:saturate-150`,
              props.color !== undefined
                ? `bg-${props.color}`
                : colors[i % colors.length],
            )}
          />
        );
      })}
    </div>
  );
}