interface Media {
    id: string;
    file_name: string;
    file_extension: string;
    media_type: number;
    title: string | null;
    describe: string | null;
    upload_date: string;
    file_size: string;
    mime_type: string;
    is_public: boolean;
    original_url: string;
    flash_access_url: string | null;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

interface MediaListResponse {
    media: Media[];
    pagination: Pagination;
}

export type { Media, Pagination, MediaListResponse };
