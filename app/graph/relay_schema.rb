RelaySchema = GraphQL::Schema.new(query: QueryType, mutation: MutationType)

def RelaySchema.explain
  Rails.cache.fetch checksum do
    RelaySchema.execute GraphQL::Introspection::INTROSPECTION_QUERY
  end
end

def RelaySchema.checksum
  files   = Dir["app/graph/**/*.rb"].reject { |f| File.directory?(f) }
  content = files.map { |f| File.read(f) }.join
  Digest::SHA256.hexdigest(content).to_s
end

def RelaySchema.prettify(str, colorize: true)
  indent_count = 0
  indent_char = ' ' * 4
  colors = []
  in_parens = nil
  str.chars.each_with_object('') do |char, string|
    case char
    when '('
      in_parens = true
      colors << :light_yellow
      string << char
    when ')'
      in_parens = false
      colors.pop
      string << char
    when '{'
      indent_count += 1
      colors << :light_blue if indent_count > 0
      string << ' ' unless string[-1] == ' '
      string << char << "\n" << (indent_char * indent_count)
    when '}'
      indent_count -= 1
      colors << nil if indent_count == 0
      string << "\n" unless string[-2..-1] == "}\n"
      string << (indent_char * indent_count)
      string << char
      string << "\n"
    when ':'
      colors[-1] = :yellow if in_parens
      string << char
    when ','
      if string[-2..-1] == "}\n"
        string[-2..-1] = "},"
      else
        string << char
      end
      if in_parens
        colors[-1] = :light_yellow
      else
        string << "\n"
        string << (indent_char * indent_count)
      end
    when ' '
      colors << nil if indent_count == 0
      string << char unless string[-1] == "\n"
    else
      string << ' ' if in_parens && %w{: ,}.include?(string[-1])
      char = char.colorize(colors.last) if colorize && colors.last.present?
      string << char
    end

    next unless colorize

    # Root Level Coloring
    if string.ends_with?('query ') && indent_count == 0
      string[-('query '.length)..-1] = string[-('query '.length)..-1].colorize(:light_green)
      colors << :light_magenta
    end

    if string.ends_with?('mutation ') && indent_count == 0
      string[-('mutation '.length)..-1] = string[-('mutation '.length)..-1].colorize(:light_red)
      colors << :light_magenta
    end

    if string.ends_with?('fragment ') && indent_count == 0
      string[-('fragment '.length)..-1] = string[-('fragment '.length)..-1].colorize(:light_green)
      colors << :light_magenta
    end

    if string.ends_with?('on ') && indent_count == 0
      colors << :light_cyan
    end
  end
end
