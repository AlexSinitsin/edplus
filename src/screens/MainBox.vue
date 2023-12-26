<template>
  <div class="main"></div>
</template>

<script>
import { vMaska } from "maska";

export default {
  name: "ExerciseItem",
  directives: { maska: vMaska },
  components: {},
  data() {
    return {
      weight: "",
      repeats: "",
      click: false,
      add: false,
      text: "",
      message: {
        weight:
          "Необходимо так подбирать рабочий вес, чтобы у вас в запасе оставалась возможность выполнить еще 2-3 повтора",
        repeats: "Максимальное количество подходов в данном упражнение",
        relax:
          "Интервал отдыха между подходами Если у вас два упражнения подряд, то отдых после выполнения всех упражнений",
        update: "Для замены упражнения нажмите на иконку с двумя стрелочками",
        home: "Нажав на иконку домика, вы  завершите тренировку без возможности вернуться!",
      },
      id_history: 0,
    };
  },
  props: {
    work: Object,
  },
  computed: {
    isText() {
      return this.text;
    },
    isIdHistory() {
      return this.id_history;
    },
    isClickWork() {
      return this.click;
    },
    workout() {
      return this.work[0];
    },
    isAdd() {
      return this.add;
    },
    isWeight() {
      return this.weight;
    },
    isRepeats() {
      return this.repeats;
    },
    history() {
      console.log(this.isAdd);
      console.log(this.$store.getters);
      if (this.isAdd) {
        console.log(this.$store.getters.days);
        return this.$store.getters.days.map((d) => {
          /*   let year = d.date.slice(2, 4)
        let month = d.date.slice(5, 7)
        let day = d.date.slice(8)
        d.date = day + '.' + month + '.' + year */
          d.values.map((v) => {
            v.data = Number(v.weight).toFixed(1) + "/" + v.repeats;
            return v;
          });
          return d;
        });
      } else {
        return this.work[0].history.map((d) => {
          /*  let year = d.date.slice(2, 4)
        let month = d.date.slice(5, 7)
        let day = d.date.slice(8)
        d.date = day + '.' + month + '.' + year */
          d.values.map((v) => {
            console.log(v.weight);
            v.data = Number(v.weight).toFixed(1) + "/" + v.repeats;
            return v;
          });
          console.log(d);
          return d;
        });
      }
    },
  },
  methods: {
    addOrUpdateWork() {
      console.log(Number(this.isWeight));
      console.log(this.work[0].history[0].values.length);
      console.log(this.work[0].max_sets);
      if (
        this.isWeight &&
        this.isRepeats &&
        (this.$store.getters.days[0].values.length < this.work[0].max_sets ||
          this.work[0].history[0].values.length < this.work[0].max_sets)
      ) {
        if (this.isClickWork) {
          this.$store.dispatch("PUT_WORKOUT", {
            id: this.isIdHistory,
            exercise_id: this.workout.id,
            weight: Number(this.isWeight),
            repeats: Number(this.isRepeats),
            difficult: 10,
            time: 10,
          });
          this.click = false;
          this.add = true;
        } else {
          this.$store.dispatch("SET_WORKOUT", {
            id: this.workout.item_id,
            exercise_id: this.workout.id,
            weight: Number(this.isWeight),
            repeats: Number(this.isRepeats),
            difficult: 10,
            time: 10,
          });
          this.add = true;
        }
      }
    },
    deleteWork() {
      if (this.isWeight && this.isRepeats) {
        this.$store.dispatch("DELETE_WORKOUT", { id: this.isIdHistory });
      }
    },
    clickWork(id, weight, repeats) {
      this.click = true;
      this.id_history = id;
      this.weight = Number(weight);
      this.repeats = repeats;
    },
    goRepeat() {
      this.$emit("repeat");
    },
    goRelax() {
      this.$emit("relax");
    },
    goWeight() {
      this.$emit("weight");
    },
  },
};
</script>

<style scoped lang="scss">
.main {
}
</style>
