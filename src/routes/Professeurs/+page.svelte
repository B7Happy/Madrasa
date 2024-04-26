<script lang="ts">
    import { browser } from '$app/environment';
    export let data;
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
    const handler = new DataHandler(data.professeurs, { rowsPerPage: 10 });
    const rows = handler.getRows();

</script>

<div class="container mx-auto px-4 bg-white">
    <h1 class="text-xl">Professeurs</h1>

    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <Th {handler} orderBy="nom">Nom</Th>
                    <Th {handler} orderBy="telMobile">Telephone mobile</Th>
                    <Th {handler} orderBy="email">Email</Th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.nom}</td>
                        <td>{row.telMobile}</td>
                        <td>{row.email}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</div>

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>