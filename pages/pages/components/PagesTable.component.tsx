import React, { useState } from 'react';
import { Table, Column } from '@tindtechnologies/tind-components';

export interface Page {
    id: string;
    name: string;
    content?: string;
    createdAt?: string;
    modifiedAt?: string;
    status?: string;
    language?: string;
}

export interface PagesTableProps {
    pages: Page[]; 
}

export const PagesTable = ({
    pages
}: PagesTableProps) => {
    const [selection, setSelection] = useState([]);
    console.log(JSON.stringify(pages));

    const data = pages.map(page => {
        return {
            ...page,
            content: 'Lorem ipsum',
            createdAt: "19/01/2023",
            modifiedAt: "24/01/2023",
            status: 'Published',
            language: 'English'
        }
    })
    return (
        <>
            <Table data={data} selection={selection} onSelectionChange={(e: any) => setSelection(e.value)}>
                <Column selectionMode="multiple"></Column>
                <Column field="name" header="Name" />
                <Column field="content" header="Content" />
                <Column field="language" header="Language" />
                <Column field="createdAt" header="Created" />
                <Column field="modifiedAt" header="Modified" />
                <Column field="status" header="Status" />
            </Table>
        </>
    );
}
