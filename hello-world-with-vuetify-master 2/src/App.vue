<template>
  <v-app>
    <v-toolbar class="cyan darken-4" dark>
      <v-toolbar-title @click="showList">
        To Do with Vuetify
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <!-- <v-container fluid> -->
        <v-data-table
          :headers="headers"
          hide-actions
          v-if="activeView === 'list'"
          :items="todos"
        >

          <template slot="items" slot-scope="props" >
            <tr @click="showDetails(props.item)">
              <td>{{ props.item.title }}</td>
              <td class="text-xs-right">
                <v-btn v-show="!props.item.complete" flat icon @click.stop="toggleCompleteStatus(props.item)">
                  <v-icon >check_box_outline_blank</v-icon>
                </v-btn>
                <v-btn v-show="props.item.complete" flat icon @click.stop="toggleCompleteStatus(props.item)">
                  <v-icon >check_box</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>

          <template slot="no-data">
            <v-alert value="true" color="info" >
              Nothing to do! Add something :D
            </v-alert>
          </template>
        </v-data-table>


        <v-card v-if="activeView === 'details'" height="100%">
          <v-card-title primary-title>
              <v-text-field name="title" label="Title" v-model="selectedToDo.title">
              </v-text-field>
          </v-card-title>
          <v-card-text>
              <v-text-field name="description" label="Description" textarea v-model="selectedToDo.description">
              </v-text-field>
              <v-btn
                @click.native="toggleCompleteStatus(selectedToDo)"
              >
                Complete
                <v-icon right v-if="selectedToDo.complete">check_box</v-icon>
                <v-icon right v-if="!selectedToDo.complete">check_box_outline_blank</v-icon>
              </v-btn>
          </v-card-text>
        </v-card>

      <!-- </v-container> -->
    </v-content>

    <v-toolbar class="cyan darken-3" dark extended>
      <v-btn
        v-if="selectedToDo === null"
        color="pink" dark absolute top right fab
        @click="createToDo"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-btn
        v-if="selectedToDo !== null"
        color="green" dark absolute top right fab
        @click="saveChanges"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        v-if="selectedToDo !== null"
        color="red" dark absolute left top fab
        @click="deleteToDo"
      >
        <v-icon>delete</v-icon>
      </v-btn>

    </v-toolbar>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        activeView: 'list', // details
        headers: [
          {text: 'To do', align: 'left', sortable: true, value: 'title'},
          {text: 'Complete', align: 'right', sortable: true, value: 'complete'},
        ],
        todos: [
          this.buildNewToDo('walk dogs', 'walkm'),
          this.buildNewToDo('feed the cats', 'feedm')
        ],
        selectedToDo: null
      }
    },
    methods: {
      showList () {
        this.activeView = 'list'
        this.selectedToDo = null
      },
      showDetails (item) {
        this.selectedToDo = item
        this.activeView = 'details'
      },

      createToDo () {
        this.todos.push(this.buildNewToDo())
        this.showDetails(this.todos[this.todos.length - 1])
      },

      buildNewToDo (title = "", description = "") {
        return {title, description, complete: false}
      },

      saveChanges () {
        // well, airquote save changes airquote. In this case we're
        // just letting the two way binding "save" the changes
        this.showList()
      },

      toggleCompleteStatus (todo) {
        todo.complete = !todo.complete
      },

      deleteToDo () {
        // note that we're only going to delete from the details page in this demo so
        // I'm fine just deleting whatever's currently selected
        const targetIndex = this.todos.indexOf(this.selectedToDo)
        this.todos.splice(targetIndex, 1)
        this.selectedToDo = null
        this.showList()
      }
    }
  }
</script>
