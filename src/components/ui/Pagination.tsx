"use client";

import { Button } from "./Button";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-(--border-subtle) bg-surface px-4 py-3 text-(--text-secondary)">
    <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
      Previous
    </Button>
    <p className="text-sm">
      Page {page} of {pageCount}
    </p>
    <Button
      variant="ghost"
      size="sm"
      disabled={page === pageCount}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </Button>
  </div>
);
