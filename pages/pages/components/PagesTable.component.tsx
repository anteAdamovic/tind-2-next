import React, { useState } from 'react';
import { Table, Column, Button, ButtonSet } from '@tindtechnologies/tind-components';

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
    const [selection, setSelection] = useState<any>(null);
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

    const viewPage = () => {
        window.open("/pages/" + selection.name, "_blank");
    }

    const editPage = () => {
        window.open("/pages/edit/" + selection.name, "_blank");
    }

    const publishPage = () => {
        window.open("/pages/publish/" + selection.name, "_blank");
    }

    return (
        <>
            <Table data={data} selectionMode="single" selection={selection} onSelectionChange={(e) => {
                setSelection(e.value);
            }}>
                <Column field="name" header="Name" />
                <Column field="content" header="Content" />
                <Column field="language" header="Language" />
                <Column field="createdAt" header="Created" />
                <Column field="modifiedAt" header="Modified" />
                <Column field="status" header="Status" />
                <Column body={
                    <ButtonSet className="m-w-400">
                        <Button type="primary" label="View" icon='pi pi-eye' size="small" outlined={true} onClick={viewPage}></Button>
                        <Button type="primary" label="Edit" icon='pi pi-pencil' size="small" outlined={true} onClick={editPage}></Button>
                        <Button type="primary" label="Delete" icon="pi pi-trash" size="small" outlined={true}></Button>
                        <Button type="primary" label="Unpublish" icon="pi pi-file-excel" size="small" outlined={true} onClick={publishPage}></Button>
                    </ButtonSet>
                }></Column>
            </Table>
        </>
    );
}
