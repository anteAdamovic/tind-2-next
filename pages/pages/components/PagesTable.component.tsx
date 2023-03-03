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
    const [selection, setSelection] = useState([]);
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

    const viewPage = (page: any) => {
        window.open("/pages/" + page.name, "_blank");
    }

    const editPage = (page: any) => {
        location.href = "/pages/edit/" + page.name;
    }

    const publishPage = (page: any) => {
        location.href  = "/pages/publish/" + page.name;
    }

    const bodyTemplate = (page: any) => {
        return (<ButtonSet className="m-w-400">
            <Button type="primary" label="View" icon='pi pi-eye' size="small" outlined={true} onClick={() => viewPage(page)}></Button>
            <Button type="primary" label="Edit" icon='pi pi-pencil' size="small" outlined={true} onClick={() => editPage(page)}></Button>
            <Button type="primary" label="Delete" icon="pi pi-trash" size="small" outlined={true}></Button>
            <Button type="primary" label="Unpublish" icon="pi pi-file-excel" size="small" outlined={true} onClick={() => publishPage(page)}></Button>
        </ButtonSet>);
    };

    return (
        <>
            <Table data={data} selection={selection} onSelectionChange={(e) => setSelection(e.value)}>
                <Column selectionMode="multiple"></Column>
                <Column field="name" header="Name" />
                <Column field="content" header="Content" />
                <Column field="language" header="Language" />
                <Column field="createdAt" header="Created" sortable={true} />
                <Column field="modifiedAt" header="Modified" sortable={true} />
                <Column field="status" header="Status" sortable={true} />
                <Column body={bodyTemplate as any}></Column>
            </Table>
        </>
    );
}
