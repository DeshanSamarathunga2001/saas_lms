"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (subject === "all") {
            params.delete("subject");
        } else if (subject) {
            params.set("subject", subject);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [subject, router, searchParams, pathname]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;