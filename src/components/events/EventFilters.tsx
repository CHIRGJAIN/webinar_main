"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface EventFiltersProps {
  onChange: (filters: {
    search?: string;
    category?: string;
    status?: string;
    accessLevel?: string;
    topic?: string;
    institution?: string;
    language?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  categories: string[];
  topics: string[];
  institutions: { id: string; name: string }[];
  languages: string[];
}

const statuses = ["all", "upcoming", "live", "completed"];
const accessLevels = ["all", "open", "registered_only", "institution_only"];

export const EventFilters = ({ onChange, categories, topics, institutions, languages }: EventFiltersProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [accessLevel, setAccessLevel] = useState("all");
  const [topic, setTopic] = useState("all");
  const [institution, setInstitution] = useState("all");
  const [language, setLanguage] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const emitChange = (nextFilters: {
    search?: string;
    category?: string;
    status?: string;
    accessLevel?: string;
    topic?: string;
    institution?: string;
    language?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    onChange({ search, category, status, accessLevel, topic, institution, language, startDate, endDate, ...nextFilters });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
    setAccessLevel("all");
    setTopic("all");
    setInstitution("all");
    setLanguage("all");
    setStartDate("");
    setEndDate("");
    onChange({
      search: "",
      category: "all",
      status: "all",
      accessLevel: "all",
      topic: "all",
      institution: "all",
      language: "all",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="grid gap-4 rounded-3xl border border-(--border-subtle) bg-surface p-4 shadow-(--shadow-soft) lg:grid-cols-8">
      <div className="lg:col-span-2">
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            emitChange({ search: event.target.value });
          }}
          placeholder="Search events or speakers"
        />
      </div>
      <Select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          emitChange({ category: event.target.value });
        }}
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      <Select
        value={topic}
        onChange={(event) => {
          setTopic(event.target.value);
          emitChange({ topic: event.target.value });
        }}
      >
        <option value="all">All topics</option>
        {topics.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        value={institution}
        onChange={(event) => {
          setInstitution(event.target.value);
          emitChange({ institution: event.target.value });
        }}
      >
        <option value="all">All institutions</option>
        {institutions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
      <Select
        value={language}
        onChange={(event) => {
          setLanguage(event.target.value);
          emitChange({ language: event.target.value });
        }}
      >
        <option value="all">All languages</option>
        {languages.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
          emitChange({ status: event.target.value });
        }}
      >
        {statuses.map((value) => (
          <option key={value} value={value}>
            {value === "all" ? "All statuses" : value}
          </option>
        ))}
      </Select>
      <Select
        value={accessLevel}
        onChange={(event) => {
          setAccessLevel(event.target.value);
          emitChange({ accessLevel: event.target.value });
        }}
      >
        {accessLevels.map((value) => (
          <option key={value} value={value}>
            {value === "all" ? "Access (all)" : value.replace("_", " ")}
          </option>
        ))}
      </Select>
      <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
        <Input
          type="date"
          value={startDate}
          onChange={(event) => {
            setStartDate(event.target.value);
            emitChange({ startDate: event.target.value });
          }}
          placeholder="Start date"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(event) => {
            setEndDate(event.target.value);
            emitChange({ endDate: event.target.value });
          }}
          placeholder="End date"
        />
      </div>
      <Button variant="ghost" onClick={resetFilters} className="lg:col-span-2">
        <Filter size={16} />
        Reset filters
      </Button>
    </div>
  );
};
