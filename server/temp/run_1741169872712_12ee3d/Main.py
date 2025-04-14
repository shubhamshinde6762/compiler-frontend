class Reader4:
    file_content = ""
    file_pointer = 0

    @classmethod
    def set_file(cls, content):
        cls.file_content = content
        cls.file_pointer = 0

    @classmethod
    def read4(cls, buf4):
        i = 0
        while i < 4 and cls.file_pointer < len(cls.file_content):
            buf4[i] = cls.file_content[cls.file_pointer]
            cls.file_pointer += 1
            i += 1
        return i


class Solution:
    """
    Reads 'n' characters from the file using the read4 method.
    
    :param buf: Destination buffer (list of characters)
    :param n: Number of characters to read
    :return: Number of actual characters read
    """
    def read(self, buf, n):
        copied_chars = 0
        read_chars = 4
        remaining_chars = n

        while remaining_chars >= 4 and read_chars == 4:
            buf4 = [''] * 4
            read_chars = Reader4.read4(buf4)
            buf[copied_chars:copied_chars + read_chars] = buf4[:read_chars]
            copied_chars += read_chars
            remaining_chars -= read_chars

        if remaining_chars > 0 and read_chars > 0:
            buf4 = [''] * 4
            read_chars = Reader4.read4(buf4)
            buf[copied_chars:copied_chars + min(remaining_chars, read_chars)] = buf4[:min(remaining_chars, read_chars)]
            copied_chars += min(remaining_chars, read_chars)

        return min(n, copied_chars)


def main():
    T = int(input().strip())

    for t in range(1, T + 1):
        test_case_label = input().strip()
        print(test_case_label)

        file_content = input().strip()
        n = int(input().strip())

        Reader4.set_file(file_content)
        solution = Solution()
        buf = [''] * 1000  # Large enough buffer
        chars_read = solution.read(buf, n)

        print(chars_read)
        print("".join(buf[:chars_read]))


if __name__ == "__main__":
    main()