<template>
  <main class="w-[300px] px-4 pb-5 text-gray-700">
    <div
      class="header flex items-center justify-between py-2 border-b border-slate-200"
    >
      <Logo />
      <h2 class="text-lg font-semibold flex items-center">
        <flat-color-icons-flash-on
          :fill="tabIsVuiGhe ? '#f01c0c' : '#6666'"
          width="29"
          height="29"
          class="path-fill-inherit"
        />
        <!-- Vuighe.net -->
      </h2>
    </div>

    <div :disabled="!tabIsVuiGhe">
      <div class="text-lg pt-1">
        Tùy chọn
      </div>

      <ul class="list-none list-options">
        <li>
          <div class="header">
            <span class="name">
              <noto-firecracker />
              VIP
            </span>
            <Switch v-model="options.active_VIP" />
          </div>
          <small
            class="text-slate-500"
          >Kích hoạt chế độ VIP để không có quảng cáo và xem tốc độ nhanh
            hơn</small>
        </li>
        <li>
          <div class="header">
            <span class="name">
              <bi-keyboard />
              Phím tắt mạnh
            </span>
            <Switch v-model="options.keybinding_window" />
          </div>
          <small
            class="text-slate-500"
          >Kích hoạt các phím tắt ngay cả khi focus vào trình phát</small>
        </li>
        <li>
          <div class="header">
            <span class="name">
              <ic-outline-high-quality />
              Chất lượng phát mặc
            </span>
            <Select
              v-model="options.quality_default"
              :options="optionsQualityDefault"
              class="bottom min-w-[88.88px]"
              close-after-select
            >
              <template #value="{ option }">
                <template v-if="option">
                  {{ option.name }}
                  <bi-badge-hd
                    v-if="parseInt(option.name) >= 720"
                    color="rgb(225 29 72)"
                    class="ml-1"
                  />
                </template>
                <template v-else>
                  &lt;any&gt;
                </template>
              </template>
              <template #item="{ item: option }">
                {{ option.name }}
                <bi-badge-hd
                  v-if="parseInt(option.name) >= 720"
                  color="rgb(225 29 72)"
                />
              </template>
            </Select>
          </div>
          <small
            class="text-slate-500"
          >Đặt chất lượng phát mặc định mỗi khi bạn xem anime</small>
        </li>
        <li>
          <div class="header">
            <span class="name">
              <ic-baseline-auto-fix-high />
              Nhắc nhở tạm dừng
            </span>
            <Switch v-model="options.remind_pause" />
          </div>
          <small
            class="text-slate-500"
          >Sau 1h15p không có tương tác sẽ tạm dừng anime đề phòng ngủ
            quên</small>
        </li>
      </ul>
    </div>

    <div
      v-if="!tabIsVuiGhe"
      class="fixed top-[50%] left-[50%] text-base text-center"
      style="transform: translate(-50%, -50%)"
    >
      <span
        class="text-slate-500"
      >Tiện ích này chỉ hoạt động trên trang web
        <a
          class="text-blue-600 font-medium"
          href="https://vuighe.net"
          target="_blank"
        >https://vuighe.net</a></span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { isVuiGhe } from "~/logic/isVuiGhe";
import { Options } from "~/type/Options";

const options = ref<
Partial<Options>
>({});
watch(
  options,
  () => {
    browser.storage.sync.set({
      options: options.value,
    });
  },
  {
    deep: true,
  }
);
browser.storage.sync.get("options").then((data) => {
  options.value = data.options ?? {};
});
function watchSyncOptions(data: any, type: string) {
  if (type === "sync" && "options" in data) {
    options.value = {
      ...(data.options.newValue || {}),
    };
  }
}
browser.storage.onChanged.addListener(watchSyncOptions);
onBeforeUnmount(() =>
  browser.storage.onChanged.removeListener(watchSyncOptions)
);

const optionsQualityDefault = [
  {
    name: "auto",
  },
  {
    name: "240p",
  },
  {
    name: "480p",
  },
  {
    name: "720p",
  },
  {
    name: "1080p",
  },
];

const tabIsVuiGhe = ref<boolean>(false);
browser.tabs.query({
  active: true,
  currentWindow: true,
}).then(([tab]) => {
  tabIsVuiGhe.value = !!tab && isVuiGhe(tab.url || "");
});
</script>

<style lang="scss" scoped>
[disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
}
.list-options {
  > li {
    padding-bottom: 10px;
    .header {
      padding-top: 10px;
      padding-bottom: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 16px;
        font-weight: 600;
        white-space: break-spaces;
        display: flex;
        align-items: center;
      }
    }
    small {
      font-size: 12px;
      color: #666666;
      line-height: 1.4;
    }
  }
}
.path-fill-inherit::v-deep(path) {
  fill: inherit;
}
</style>
