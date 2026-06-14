import sys
import os

def convert(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    with open(output_path, 'w', encoding='utf-8') as out:
        in_copy = False
        table_name = ""
        columns = ""
        
        for line in lines:
            if line.startswith("COPY "):
                # COPY public.table (col1, col2) FROM stdin;
                parts = line.strip().split(" FROM stdin;")
                if len(parts) == 2:
                    in_copy = True
                    copy_stmt = parts[0] # COPY public.table (col1, col2)
                    table_name_cols = copy_stmt[5:] # public.table (col1, col2)
                    idx = table_name_cols.find('(')
                    if idx != -1:
                        table_name = table_name_cols[:idx].strip()
                        columns = table_name_cols[idx:]
                    else:
                        table_name = table_name_cols.strip()
                        columns = ""
                else:
                    out.write(line)
            elif in_copy:
                if line.strip() == r"\.":
                    in_copy = False
                else:
                    # Data line
                    fields = line.strip('\n').split('\t')
                    vals = []
                    for f_val in fields:
                        if f_val == r'\N':
                            vals.append('NULL')
                        else:
                            # escape single quotes
                            escaped = f_val.replace("'", "''")
                            vals.append(f"'{escaped}'")
                    val_str = ", ".join(vals)
                    out.write(f"INSERT INTO {table_name} {columns} VALUES ({val_str});\n")
            else:
                out.write(line)

if __name__ == "__main__":
    convert('/home/dharani/Desktop/auraweds/backend/aw_backup_read.sql', '/home/dharani/Desktop/auraweds/backend/aw_backup_inserts.sql')
    print("Conversion complete: aw_backup_inserts.sql created.")
