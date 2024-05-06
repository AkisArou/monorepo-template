import React from "react";

export function Button({ children }: { children: React.ReactNode }) {
	return <div className="bg-red-400 h-[20px]">{children}</div>;
}
