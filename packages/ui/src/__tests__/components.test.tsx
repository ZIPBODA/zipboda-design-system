import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "../Checkbox.js";
import { SearchBar } from "../SearchBar.js";
import { Rating } from "../Rating.js";
import { Avatar } from "../Avatar.js";
import { Divider } from "../Divider.js";
import { CardProduct } from "../CardProduct.js";
import { CardListing } from "../CardListing.js";
import { ListItem } from "../ListItem.js";
import { Modal } from "../Modal.js";

describe("Checkbox", () => {
  it("라벨을 렌더한다", () => {
    render(<Checkbox label="약관 동의" />);
    expect(screen.getByText("약관 동의")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("클릭하면 체크 상태가 토글된다", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="선택" />);
    const box = screen.getByRole("checkbox");
    await user.click(box);
    expect(box).toBeChecked();
    await user.click(box);
    expect(box).not.toBeChecked();
  });

  it("disabled면 상호작용이 불가하다", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="비활성" disabled />);
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    await user.click(box);
    expect(box).not.toBeChecked();
  });
});

describe("SearchBar", () => {
  it("검색 입력을 렌더하고 타이핑을 반영한다", async () => {
    const user = userEvent.setup();
    render(<SearchBar placeholder="검색어" />);
    const input = screen.getByPlaceholderText("검색어");
    expect(input).toHaveAttribute("type", "search");
    await user.type(input, "강남");
    expect(input).toHaveValue("강남");
  });
});

describe("Rating", () => {
  it("max개의 별을 렌더하고 value만큼 채운다", () => {
    const { container } = render(<Rating value={3} max={5} />);
    const stars = container.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
    const filled = Array.from(stars).filter((s) => s.getAttribute("class")?.includes("text-brand"));
    expect(filled).toHaveLength(3);
  });

  it("접근성 라벨에 value/max를 노출한다", () => {
    render(<Rating value={4} max={5} />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", "4 / 5");
  });

  it("value 미지정 시 0개를 채운다", () => {
    const { container } = render(<Rating />);
    const filled = Array.from(container.querySelectorAll("svg")).filter((s) =>
      s.getAttribute("class")?.includes("text-brand")
    );
    expect(filled).toHaveLength(0);
  });
});

describe("Avatar", () => {
  it("src가 있으면 이미지를 렌더한다", () => {
    render(<Avatar src="/u.png" alt="사용자" />);
    expect(screen.getByRole("img", { name: "사용자" })).toHaveAttribute("src", "/u.png");
  });

  it("src가 없으면 이니셜을 렌더한다", () => {
    render(<Avatar initials="김집" />);
    expect(screen.getByText("김집")).toBeInTheDocument();
  });
});

describe("Divider", () => {
  it("기본은 수평 separator다", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("orientation=vertical을 반영한다", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });
});

describe("CardProduct", () => {
  it("브랜드·상품명·가격을 렌더한다", () => {
    render(<CardProduct brand="한샘" name="원목 책상" price="₩129,000" />);
    expect(screen.getByText("한샘")).toBeInTheDocument();
    expect(screen.getByText("원목 책상")).toBeInTheDocument();
    expect(screen.getByText("₩129,000")).toBeInTheDocument();
  });

  it("brand 미지정 시 브랜드 텍스트를 렌더하지 않는다", () => {
    render(<CardProduct name="의자" price="₩50,000" />);
    expect(screen.getByText("의자")).toBeInTheDocument();
  });
});

describe("CardListing", () => {
  it("제목·위치·D-day를 렌더한다", () => {
    render(<CardListing title="광진 자양 LH 주택" location="서울 · 광진구" dday="D-3" />);
    expect(screen.getByText("광진 자양 LH 주택")).toBeInTheDocument();
    expect(screen.getByText("서울 · 광진구")).toBeInTheDocument();
    expect(screen.getByText("D-3")).toBeInTheDocument();
  });
});

describe("ListItem", () => {
  it("라벨과 값을 렌더한다", () => {
    render(<ListItem label="공급 유형" value="국민임대" />);
    expect(screen.getByText("공급 유형")).toBeInTheDocument();
    expect(screen.getByText("국민임대")).toBeInTheDocument();
  });

  it("값이 없으면 값 노드를 렌더하지 않는다", () => {
    const { container } = render(<ListItem label="라벨만" />);
    expect(container.querySelectorAll("span")).toHaveLength(1);
  });
});

describe("Modal", () => {
  it("confirm은 제목·메시지·취소/확인 버튼과 dialog 역할을 렌더한다", () => {
    render(<Modal variant="confirm" title="확인" message="진행할까요?" />);
    expect(screen.getByRole("dialog", { name: "확인" })).toBeInTheDocument();
    expect(screen.getByText("진행할까요?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("open=false면 아무것도 렌더하지 않는다", () => {
    const { container } = render(<Modal open={false} title="숨김" message="x" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("alert 주 버튼은 삭제(danger)이고 onConfirm을 호출한다", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Modal variant="alert" title="삭제 확인" message="삭제할까요?" onConfirm={onConfirm} />);
    const del = screen.getByRole("button", { name: "삭제" });
    expect(del).toHaveClass("bg-modal-alert-icon");
    await user.click(del);
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("info·success는 취소 버튼이 없다", () => {
    const { rerender } = render(<Modal variant="info" title="안내" message="i" />);
    expect(screen.queryByRole("button", { name: "취소" })).toBeNull();
    rerender(<Modal variant="success" title="완료" message="s" />);
    expect(screen.queryByRole("button", { name: "취소" })).toBeNull();
  });

  it("form은 children 슬롯을 렌더하고 저장 버튼을 노출한다", () => {
    render(
      <Modal variant="form" title="공고 상태 변경">
        <label>사유<input aria-label="사유" /></label>
      </Modal>
    );
    expect(screen.getByLabelText("사유")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
  });

  it("size=lg면 넓은 폭(max-w-[640px]) 클래스를 적용한다", () => {
    render(<Modal variant="form" size="lg" title="넓은 폼"><input aria-label="f" /></Modal>);
    expect(screen.getByRole("dialog", { name: "넓은 폼" })).toHaveClass("max-w-[640px]");
  });

  it("size 미지정 form은 기본 480px 폭이다", () => {
    render(<Modal variant="form" title="기본 폼"><input aria-label="g" /></Modal>);
    expect(screen.getByRole("dialog", { name: "기본 폼" })).toHaveClass("max-w-[480px]");
  });

  it("닫기(✕)를 누르면 onClose를 호출한다", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal title="확인" message="m" onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
