import React, { useRef, useState } from 'react'
import {
    Button,
    ButtonSet,
    Messages,
    Table,
    Column,
    ConfirmPopup
} from '@tindtechnologies/tind-components/components';

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
    const messagesRef: any = useRef(null);
    const popupRef: any = useRef(null);
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

    const deletePage = (page: any, elRef: any) => {
        popupRef.current?.show({
            type: 'delete',
            message: 'Are you sure you want to proceed?',
            target: elRef.current
        });
    }

    const publishPage = (page: any) => {
        location.href = "/pages/publish/" + page.name;
    }

    const selectPage = (_selection: any[]) => {
        setSelection(_selection as any);

        if (_selection.length) {
            messagesRef.current.show({ severity: "success", summary: "", detail: `Page "${_selection[_selection.length - 1]?.name}" has been published!`, closable: true });
        }
    }

    const onDeleteAccept = () => {
        messagesRef.current.show({ severity: "error", summary: "", detail: `Page has been deleted!`, closable: true });
    }

    const bodyTemplate = (page: any) => {
        let elRef: any = useRef(null);

        return (
            <ButtonSet className="m-w-400">
                <Button type="primary" label="View" icon='pi pi-eye' size="small" outlined={true} onClick={() => viewPage(page)}></Button>
                <Button type="primary" label="Edit" icon='pi pi-pencil' size="small" outlined={true} onClick={() => editPage(page)}></Button>
                <span ref={elRef}>
                    <Button type="primary" label="Delete" icon="pi pi-trash" size="small" outlined={true} onClick={() => deletePage(page, elRef)}></Button>
                </span>
                <Button type="primary" label="Unpublish" icon="pi pi-file-excel" size="small" outlined={true} onClick={() => publishPage(page)}></Button>
            </ButtonSet>
        );
    };


    return (
        <>
            <Messages childRef={messagesRef} />
            <ConfirmPopup childRef={popupRef} accept={onDeleteAccept} reject={() => { }} />
            <Table data={data} selection={selection} onSelectionChange={(e) => selectPage(e.value)}>
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
